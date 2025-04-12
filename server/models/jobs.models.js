import mongoose,{Schema} from "mongoose";

const jobSchema = new Schema(
    {
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String,
            required: true
        },
        skillsRequired: [{ 
            type: String 
        }],
        experienceRequired: { 
            type: Number 
        },
        experienceKeywords: [
            {
              type: String
            }
        ],
        prioritySkills: [
            {
              type: String
            }
        ],
        location: { 
            type: String 
        },
        salaryRange: { 
            type: String 
        },
        recruiterId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Recruiter" 
        },
        applicants: [{ 
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            score: { type: Number }, // AI Matching Score
            status: { type: String, enum: ["Applied", "Shortlisted", "Hired"], default: "Applied" },
            breakdown: {
                description_score: { type: Number },
                skills_score: { type: Number },
                priority_skills_score: { type: Number },
                experience_score: { type: Number },
                education_score: { type: Number }
            }
        }],
    },  
    {
        timestamps: true
    }
)

export const Job = mongoose.model("Job",jobSchema)