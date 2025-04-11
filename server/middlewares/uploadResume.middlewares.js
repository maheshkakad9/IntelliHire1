import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "./resumes";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const resumeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Temporarily save in `uploads`
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)); // Rename file
    }
});

const resumeFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};

const uploadResume = multer({
    storage: resumeStorage,
    fileFilter: resumeFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB max file size
});

export { uploadResume };