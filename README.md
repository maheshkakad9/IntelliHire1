# 🧠 IntelliHire - Backend Setup

The project has **two backend servers**:

- ⚙️ **Node.js (Express)** — handles authentication, job postings, resume upload, and file management.
- 🤖 **FastAPI** — powers AI features like resume parsing and NLP.

---

## 1. Node.js Server

### 🔐 Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xhapalp.mongodb.net
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=7m
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=20m

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FASTAPI_URL=http://127.0.0.1:5001

🚀 Run the Node.js Server
cd IntelliHire/server
npm install
nodemon server.js

🚀 Run the FastAPI Server
cd IntelliHire/server/fastapi_server
uvicorn main:app --host 0.0.0.0 --port 5001 --reload
