import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Recruiter } from "../models/recruiter.models.js";

//To get Users Count
const getTotalUsers = asyncHandler(async (req,res) => {
    const totalUsers = await User.countDocuments();
    return res.status(200).json(new ApiResponse(200,{ totalUsers }, "Total users fetched successfully"));
});

//To get Recruiter Count
const getTotalRecruiters = asyncHandler(async (req,res) => {
    const totalRecruiter = await Recruiter.countDocuments();
    return res.status(200).json(new ApiResponse(200, { totalRecruiter }, "Total recruiters fetched successfully"));
})

//Get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, users, "All users fetched successfully"));
});

// Get all recruiters
const getAllRecruiters = asyncHandler(async (req, res) => {
    const recruiters = await Recruiter.find().select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, recruiters, "All recruiters fetched successfully"));
});

export {
    getTotalUsers,
    getTotalRecruiters,
    getAllRecruiters,
    getAllUsers
}
