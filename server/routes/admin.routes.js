import { Router } from "express";
import { 
    getTotalUsers,
    getTotalRecruiters,
    getAllRecruiters,
    verifyRecruiter,
    getPendingRecruiters,
    getAllUsers,
    getTotalJobs
} from "../controllers/admin.controller.js";
// Import commented out for testing
// import { verifyAdminJWT } from "../middlewares/admin.middlewares.js";

const router = Router();

//Public Routes
router.route("/users/count").get(getTotalUsers);
router.route("/recruiters/count").get(getTotalRecruiters);
router.route("/jobs/count").get(getTotalJobs)
router.route("/users/all").get(getAllUsers);
router.route("/recruiters/all").get(getAllRecruiters);
// Remove authentication middleware temporarily
router.route("/pending-recruiters").get(getPendingRecruiters);
router.route("/verify-recruiter/:recruiterId").put(verifyRecruiter);

export default router;