import { Router } from "express"
import { 
    registerRecruiter,
    loginRecruiter,
    logoutRecruiter,
    refreshAccessTokenRecruiter,
    getAllRecruiters
} from "../controllers/recruiter.controller.js"
import { uploadRecruiterProfile } from "../middlewares/recruiterUpload.middlewares.js"
import {verifyRecruiterJWT} from "../middlewares/recruiter.middlewares.js"

const router = Router()

router.route("/register").post(
    uploadRecruiterProfile.single("profilePic"),
    registerRecruiter
)

router.route("/login").post(loginRecruiter)
router.route("/getRecruiters").get(getAllRecruiters)

//Secured Routes
router.route("/logout").post(verifyRecruiterJWT,logoutRecruiter)
router.route("/refresh-token").post(refreshAccessTokenRecruiter)


export default router