import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
import fs from "fs";
import path from "path"; // ✅ Add this
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log("Cloudinary config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const normalizedPath = path.resolve(localFilePath); // ✅ Define it
    console.log("Uploading to Cloudinary from path:", normalizedPath);

    const response = await cloudinary.uploader.upload(normalizedPath, {
      resource_type: "raw",
      access_mode: "public",
      folder: "resumes",
    });

    fs.unlinkSync(normalizedPath); // ✅ Now this works
    return response;

  } catch (error) {
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export { uploadOnCloudinary };