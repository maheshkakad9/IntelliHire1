IntelliHire - AI-Powered Resume Evaluation and Job Portal

IntelliHire is a modern full-stack web application that streamlines the recruitment process using AI-driven resume parsing and job matching. It enables recruiters to analyze resumes efficiently and allows job seekers to get feedback and apply to jobs with ease.


🚀 Features
🧠 AI Resume Analysis – Parses resumes to extract relevant information like skills, experience, education, etc.

📊 Candidate Ranking – Ranks applicants based on job role relevance.

☁️ Cloudinary File Uploads – Upload and manage resume files securely.

🧾 PDF/DOCX Resume Support – Upload resumes in multiple formats.

👥 Role-Based Access – Separate flows for Recruiters, Job Seekers, and Admins.

🔐 JWT Authentication with Auto-Refresh – Secure login sessions.

🌐 MongoDB Integration – Stores user profiles, and job postings.


🔧 Tech Stack
Frontend: React.js, Tailwind CSS, React Router

Backend: Node.js , Express, fastapi

ML: Natural Language Processing

Auth: JWT, Cookies

Database: MongoDB(Mongoose)

File Uploads: Cloudinary


# Clone the repository
git clone https://github.com/maheshkakad9/IntelliHire.git
cd IntelliHire
cd client  (To run frontend or client side )

# Install dependencies
npm install

# Create a .env file and set the following (example)
VITE_API_URL=http://localhost:8000

# Run the app
npm run dev

