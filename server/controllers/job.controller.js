import { Job } from "../models/jobs.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createJob = asyncHandler(async (req,res) => {
    const { title, description, skillsRequired, experienceRequired, location, salaryRange, experienceKeywords, prioritySkills} = req.body;

    const recruiterId = req.recruiter?._id || req.body.recruiterId;

    if (!recruiterId) {
        throw new ApiError(400, "Recruiter ID is required");
    }

    const job = await Job.create({
        title,
        description,
        skillsRequired,
        experienceRequired,
        experienceKeywords,
        prioritySkills,  
        location,
        salaryRange,
        recruiterId
    });

    return res.status(201).json(new ApiResponse(201, job, "Job posted successfully"));
});

const getAllJobs = asyncHandler(async (req,res) => {
    const jobs = await Job.find().populate("recruiterId", "name companyName profilePicUrl");
    return res.status(200).json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
})

const getJobsByRecruiter = asyncHandler(async (req,res) => {
    const recruiterId = req.params.recruiterId;
    const jobs = await Job.find({ recruiterId }).populate("recruiterId", "name companyName")
                                                .populate({
                                                    path: "applicants.userId",
                                                    select: "name email phone resumeUrl profilePicUrl skills experience education",
                                                    model: "User"
                                                })
    return res.status(200).json(new ApiResponse(200, jobs, "Jobs by recruiter fetched successfully"));
})

const getJobById = asyncHandler(async (req,res) => {
    const job = await Job.findById(req.params.jobId).populate("recruiterId", "name companyName profilePicUrl");
    if (!job) throw new ApiError(404, "Job not found");
    return res.status(200).json(new ApiResponse(200, job, "Job details fetched successfully"));
})

const searchJobs = async (req,res) => {
    const { title, location, experience } = req.query;

    let query = {};

    if (title) {
        query.title = { $regex: title, $options: "i" }; // Case-insensitive title search
    }

    if (location) {
        query.location = { $regex: location, $options: "i" }; // Case-insensitive location search
    }

    if (experience) {
        const experienceArray = experience.split(',').map(e => parseInt(e.trim()));
        query.experienceRequired = { $in: experienceArray };
    }

    try {
        const jobs = await Job.find(query);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs", error });
    }
};

export {
    createJob,
    getAllJobs,
    getJobsByRecruiter,
    getJobById,
    searchJobs
}