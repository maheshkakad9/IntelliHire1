import { Router } from "express";
import {
    createJob,
    getAllJobs,
    getJobById,
    getJobsByRecruiter
} from "../controllers/job.controller.js";
import {verifyRecruiterJWT} from "../middlewares/recruiter.middlewares.js"

const router = Router()

//Protected Route
router.route("/").post(verifyRecruiterJWT,createJob)

//Public routes
router.route("/getAllJobs").get(getAllJobs);
router.route("/:jobId").get(getJobById);
router.route("/recruiter/:recruiterId").get(getJobsByRecruiter);

export default router