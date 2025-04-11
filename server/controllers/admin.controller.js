import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Recruiter } from "../models/recruiter.models.js";
import { Job } from "../models/jobs.models.js";

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

//To get Jobs Count
const getTotalJobs = asyncHandler(async (req, res) => {
    const totalJobs = await Job.countDocuments();
    return res
        .status(200)
        .json(new ApiResponse(200, { totalJobs }, "Total jobs fetched successfully"));
});

//Get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, users, "All users fetched successfully"));
});

// Add this function if it doesn't already exist

const verifyRecruiter = asyncHandler(async (req, res) => {
    const { recruiterId } = req.params;
    const { status } = req.body;
    
    if (!recruiterId) {
        throw new ApiError(400, "Recruiter ID is required");
    }
    
    if (!['approved', 'rejected'].includes(status)) {
        throw new ApiError(400, "Status must be either 'approved' or 'rejected'");
    }
    
    const recruiter = await Recruiter.findByIdAndUpdate(
        recruiterId,
        { verificationStatus: status },
        { new: true }
    ).select("-password -refreshToken");
    
    if (!recruiter) {
        throw new ApiError(404, "Recruiter not found");
    }
    
    return res.status(200).json(
        new ApiResponse(200, recruiter, `Recruiter ${status} successfully`)
    );
});
// Get all recruiters
const getAllRecruiters = asyncHandler(async (req, res) => {
    const recruiters = await Recruiter.find().select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, recruiters, "All recruiters fetched successfully"));
});
// Get all pending recruiters

const getPendingRecruiters = asyncHandler(async (req, res) => {
    // Find all recruiters with verificationStatus as pending
    const pendingRecruiters = await Recruiter.find({ verificationStatus: "pending" }).select("-password -refreshToken");
    
    return res.status(200).json(
        new ApiResponse(200, pendingRecruiters, "Pending recruiters fetched successfully")
    );
});

export {
    getTotalUsers,
    getTotalRecruiters,
    getAllRecruiters,
    getPendingRecruiters,
    verifyRecruiter,
    getAllUsers,
    getTotalJobs
}
