import { Router } from "express";
import { 
    getTotalUsers,
    getTotalRecruiters,
    getAllRecruiters,
    getAllUsers
 } from "../controllers/admin.controller.js"

const router = Router()

//Public Routes
router.route("/users/count").get(getTotalUsers);
router.route("/recruiters/count").get(getTotalRecruiters);
router.route("/users/all").get(getAllUsers);
router.route("/recruiters/all").get(getAllRecruiters)

export default router
