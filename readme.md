# BU PLAC - University Placement Management System

An AI-powered microservices platform connecting students, recruiters, and placement coordinators in one unified system.

## Problem Statement
Students struggle finding job opportunities across multiple platforms. This system consolidates placements with AI mentorship for interview prep and skill guidance.

## Key Features
- **One-time Registration** - Secure student profiles with skill tracking
- **AI Mock Interviews** - Google Gemini-powered practice with feedback
- **Resume Parsing** - Auto-extract skills & education
- **Job Discovery** - Smart job matching based on skills/CGPA
- **Real-time Messaging** - Chat with recruiters & mentors
- **Admin Dashboard** - Manage drives, approvals, announcements

## Architecture
12 microservices + Nginx gateway + MongoDB + AI integration

| Service | Purpose |
|---------|---------|
| auth-service | Authentication & JWT |
| profile-service | Student profiles & resumes |
| job-service | Job postings |
| interview-service | 🤖 AI interviews |
| messaging-service | Real-time chat |
| + 7 more services | Skills, quiz, tasks, announcements, etc. |

## Quick Start

```bash
git clone <repo-url> && cd bu-plac
npm install
docker-compose up -d
```

**API:** `http://localhost`

##Key Endpoints

```
POST   /api/auth/register          - Register
POST   /api/auth/login             - Login
GET    /api/jobs                   - Browse jobs
POST   /api/applications           - Apply
POST   /api/interview/start        - Start AI interview
POST   /api/messaging/send         - Send message
```

## AI Features
- Dynamic interview questions via Gemini
- Real-time answer evaluation
- Skill gap analysis with learning recommendations
- Smart candidate ranking (TF-IDF + cosine similarity)

## Tech Stack
**Backend:** Node.js, Express, MongoDB  
**Frontend:** React  
**AI:** Google Gemini API  
**DevOps:** Docker, Nginx

## Project Snapshots
**Landing Page**
<img width="1919" height="940" alt="image" src="https://github.com/user-attachments/assets/1c6dcd53-11fc-4ad8-8ad9-ce7dc1955378" />

**Student Dashboard**
<img width="1919" height="988" alt="image" src="https://github.com/user-attachments/assets/750a6d0d-911b-4df6-acf2-2b8d46c7c30e" />


**Apply for job**
<img width="1919" height="996" alt="image" src="https://github.com/user-attachments/assets/5a6c9888-d552-468a-a028-6a93282c6576" />

**Coding Task**
<img width="1919" height="994" alt="image" src="https://github.com/user-attachments/assets/2a9fa43d-323b-4256-9b90-03c8ce0935ff" />

**My Applications**
<img width="1919" height="996" alt="image" src="https://github.com/user-attachments/assets/2af22e56-a05d-4be3-bc98-e78a0f1de107" />

**Mock Interviews**
<img width="1894" height="915" alt="image" src="https://github.com/user-attachments/assets/9a895fe1-c70b-4813-8b2d-f142a3522104" />
<img width="1919" height="998" alt="image" src="https://github.com/user-attachments/assets/1ac73417-f073-4025-9a42-7f60dbb355a4" />


**Admin Dashboard**
<img width="1919" height="989" alt="image" src="https://github.com/user-attachments/assets/d5b9e925-f838-469c-bb83-f7f8e35abf1e" />



**TPO- DASHBOARD**
<img width="1919" height="999" alt="image" src="https://github.com/user-attachments/assets/2e7e33d3-f42e-4d3e-89f3-08b02e81c16f" />




