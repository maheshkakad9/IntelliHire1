import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Recruiter } from "../models/recruiter.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (recruiterId) => {
    try {
        const recruiter = await Recruiter.findById(recruiterId);
        const accessToken = recruiter.generateAccessToken();
        const refreshToken = recruiter.generateRefreshToken();

        recruiter.refreshToken = refreshToken;
        await recruiter.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error generating access and refresh tokens");
    }
}

const registerRecruiter = asyncHandler(async (req,res) => {
    const { name, email, password, companyName, companyWebsite, phone } = req.body;
    
    if ([name, email, password, companyName].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All required fields must be filled");
    }

    const existingRecruiter = await Recruiter.findOne({ email });

    if (existingRecruiter) {
        throw new ApiError(409, "Recruiter with this email already exists");
    }

    let profilePicUrl = "";

    if (req.file) {
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (!cloudinaryResponse) {
            throw new ApiError(500, "Profile picture upload failed");
        }
        profilePicUrl = cloudinaryResponse.secure_url;
    }

    const recruiter = await Recruiter.create({
        name,
        email,
        password,
        companyName,
        companyWebsite,
        phone,
        profilePicUrl
    });

    const createdRecruiter = await Recruiter.findById(recruiter._id).select("-password -refreshToken");

    if (!createdRecruiter) {
        throw new ApiError(500, "Error while registering recruiter");
    }

    return res.status(201).json(
        new ApiResponse(201, createdRecruiter, "Recruiter registered successfully")
    );
});

const loginRecruiter = asyncHandler(async (req,res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const recruiter = await Recruiter.findOne({ email });

    if (!recruiter) {
        throw new ApiError(404, "Recruiter not found");
    }

    const isPasswordValid = await recruiter.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(recruiter._id);

    const loggedInRecruiter = await Recruiter.findById(recruiter._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { recruiter: loggedInRecruiter, accessToken, refreshToken }, "Recruiter logged in successfully"));
})

const logoutRecruiter = asyncHandler(async (req,res) => {
    await Recruiter.findByIdAndUpdate(
        req.recruiter._id,
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
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Recruiter logged out successfully"));
})

const refreshAccessTokenRecruiter = asyncHandler(async (req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const recruiter = await Recruiter.findById(decodedToken?._id);

        if (!recruiter) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== recruiter.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true
        };

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(recruiter._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
})

const getAllRecruiters = asyncHandler(async (req,res) => {
    const recruiters = await Recruiter.find().select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, recruiters, "Fetched all recruiters"));
})

export {
    registerRecruiter,
    loginRecruiter,
    logoutRecruiter,
    refreshAccessTokenRecruiter,
    getAllRecruiters
}

