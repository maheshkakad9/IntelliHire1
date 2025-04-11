import { Router } from "express"
import {
    registerUser, 
    uploadResumeToCloudinary,
    loginUser,
    logoutUser,
    refreshAccessToken, 
    getAllUsers
} from "../controllers/user.controller.js"
import { upload } from "../middlewares/userUpload.middlewares.js"
import { uploadResume } from "../middlewares/uploadResume.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/register").post(
    upload.single("profilePic"),
    registerUser
);
router.route("/login").post(loginUser)
router.route("/getUsers").get(getAllUsers)

//Secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("refresh-token").post(refreshAccessToken)
router.route("/upload-resume").post(verifyJWT,uploadResume.single("resume"),uploadResumeToCloudinary);

export default router 

