import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const recruiterSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        password: { 
            type: String, 
            required: true 
        },
        companyName: { 
            type: String, 
            required: true 
        },
        companyWebsite: { 
            type: String 
        },
        profilePicUrl: {
            type: String // Cloudinary URL for recruiter profile image
        },
        phone: { 
            type: String 
        },
        jobsPosted: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Job" 
        }],
        hires: [{ 
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
            paymentStatus: { type: String, enum: ["Pending", "Completed"], default: "Pending" }
        }],
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

recruiterSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

recruiterSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

recruiterSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

recruiterSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Recruiter = mongoose.model("Recruiter",recruiterSchema)