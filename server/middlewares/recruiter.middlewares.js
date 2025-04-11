import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Recruiter } from "../models/recruiter.models.js";

export const verifyRecruiterJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const recruiter = await Recruiter.findById(decodedToken?._id).select("-password -refreshToken");

        if (!recruiter) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.recruiter = recruiter;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})