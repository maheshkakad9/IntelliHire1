import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/jobs.models.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import axios from 'axios';

const generateAccessAndRefereshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler( async (req,res) => {
    const { name, email, password, phone, location, skills, experience, education } = req.body

    if (
        [ name, email, password, phone, skills, education].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ phone }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or phone already exists")
    }

    let profilePicUrl = "";
    console.log("Received file:", req.file);

    if (req.file) {
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (!cloudinaryResponse) {
            throw new ApiError(500, "Profile picture upload failed");
        }
        profilePicUrl = cloudinaryResponse.secure_url;
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
        location,
        skills,
        experience,
        education,
        profilePicUrl
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

const loginUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body
    console.log(email);

    if (!email) {
        throw new ApiError(400, "email is required")
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})

const uploadResumeToCloudinary = asyncHandler(async(req,res) => {
    const userId = req.user._id;
    const { jobId } = req.body;


    if (!req.file) {
        throw new ApiError(400, "Resume file is required");
    }

    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    if (!cloudinaryResponse) {
        throw new ApiError(500, "Resume upload failed");
    }

    const resumeUrl = cloudinaryResponse.secure_url;
    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    const fastApiUrl = process.env.FASTAPI_URL + "/score_resume";

    //Debugging Log
    console.log("Sending to FastAPI:", {
        resume_url: resumeUrl,
        job_description: job.description,
        skills_required: job.skillsRequired,
    });
    const scoringResponse = await axios.post(fastApiUrl,{
        resume_url: resumeUrl,
        job_description: job.description,
        skills_required: job.skillsRequired,
        priority_skills: job.prioritySkills,
        experience_keywords: job.experienceKeywords,
        degree_requirements: job.degreeRequirements
    }).catch(error => {
        console.error("Error in FastAPI request:", error.response ? error.response.data : error.message);
        throw new ApiError(400, "Error in scoring resume");
    });

    const scoreDetails = scoringResponse.data;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { resumeUrl },
        { new: true }
    ).select("-password -refreshToken");

    await Job.findByIdAndUpdate(
        jobId,
        {
            $push: {
                applicants: {
                    userId,
                    score: scoreDetails.overall_score,
                    status: "Applied",
                    breakdown: scoreDetails.breakdown,
                },
            },
        }
    );

    return res.status(200).json(new ApiResponse(200, { updatedUser , scoreDetails }, "Resume uploaded & scored successfully"));
})

const logoutUser = asyncHandler(async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find().select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200,users,"Fetched all users"));
});

const getUserProfile = asyncHandler(async (req,res) => {
    const user = req.user;

    res.status(200).json({
        success: true,
        message: "user profile fetched successfully",
        user
    })
})

export {
    registerUser,
    uploadResumeToCloudinary,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getAllUsers,
    getUserProfile
}