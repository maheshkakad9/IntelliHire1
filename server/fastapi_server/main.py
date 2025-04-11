from fastapi import FastAPI, HTTPException
import requests
import fitz  # PyMuPDF for PDF parsing
import spacy
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

nlp = spacy.load("en_core_web_sm")

def extract_text_from_pdf(pdf_url):
    """Download and extract text from a PDF resume"""
    response = requests.get(pdf_url)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to fetch resume")
    
    with open("temp_resume.pdf", "wb") as f:
        f.write(response.content)

    doc = fitz.open("temp_resume.pdf")
    text = " ".join([page.get_text() for page in doc])
    return text

def clean_text(text):
    """Preprocess text (remove special characters, lowercase)"""
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)
    return text.lower()

def score_resume(resume_text, job_description, job_skills):
    """Compare resume with job description and required skills using NLP"""

    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume_text, job_description])

    description_score = cosine_similarity(vectors[0], vectors[1])[0][0] * 100
    skills_found = [skill for skill in job_skills if skill.lower() in resume_text.lower()]
    skills_score = (len(skills_found) / len(job_skills)) * 100 if job_skills else 0

    overall_score = (description_score * 0.6) + (skills_score * 0.4)

    return {
        "overall_score": round(overall_score, 2),
        "breakdown": {
            "description_score": round(description_score, 2),
            "skills_score": round(skills_score, 2)
        }
    }

@app.post("/score_resume")
def score_resume_api(data: dict):
    print("Received Data:", data)
    resume_url = data.get("resume_url")
    job_description = data.get("job_description", "")
    job_skills = data.get("skills_required", [])

    if not resume_url:
        raise HTTPException(status_code=400, detail="Resume URL is required")
    
    resume_text = extract_text_from_pdf(resume_url)
    resume_text_clean = clean_text(resume_text)

    score_details = score_resume(resume_text_clean, job_description, job_skills)
    return score_details 