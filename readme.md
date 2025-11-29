# BU PLAC - University Placement Management System

A comprehensive microservices-based placement management platform for universities, enabling students to discover job opportunities, apply for positions, and participate in interviews, while recruiters can post jobs and manage applications.

## 🏗️ Architecture

This project follows a **microservices architecture** with:
- **API Gateway** (Nginx) - Central routing and CORS handling
- **12 Backend Services** - Each handling specific domain logic
- **MongoDB** - Data persistence across services
- **Python AI Services** - Resume parsing, skill gap analysis, and applicant shortlisting
- **Docker & Docker Compose** - Containerized deployment

### Services Overview

| Service | Port | Purpose |
|---------|------|---------|
| auth-service | 5001 | User authentication & JWT token management |
| profile-service | 5002 | Student profile & resume management |
| job-service | 5003 | Job postings by recruiters |
| application-service | 5004 | Job applications tracking |
| notification-service | 5005 | Email/push notifications |
| skills-service | 5006 | Skill management & recommendations |
| quiz-service | 5007 | Technical assessment quizzes |
| announcement-service | 5008 | University announcements |
| hackathon-service | 5009 | Hackathon event management |
| task-service | 5010 | Task & assignment tracking |
| interview-service | 5011 | Interview scheduling & AI-assisted interviews |
| messaging-service | 5012 | Real-time messaging between users |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ & npm
- Python 3.10+
- Docker & Docker Compose
- MongoDB (optional if using Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd bu-plac
   ```

2. **Set up environment variables**
   ```bash
   # Root .env
   MONGODB_URI=mongodb://localhost:27017/placement
   JWT_SECRET=your-secret-key
   GEMINI_API_KEY=your-gemini-api-key
   ```

3. **Install dependencies**
   ```bash
   # Backend services
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

4. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```
   The API Gateway will be available at `http://localhost:80`

5. **Or start services individually**
   ```bash
   # Terminal 1: Auth Service
   cd backend/auth-service
   npm start

   # Terminal 2: Profile Service
   cd backend/profile-service
   npm start

   # Continue for other services...
   ```

## 📋 API Endpoints

All endpoints are prefixed with `/api` and routed through the Nginx gateway.

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login & get JWT token
- `GET /profile` - Get current user profile (requires auth)

### Profile (`/api/profile`)
- `POST /profile` - Create/update student profile
- `GET /profile` - Get student profile
- `POST /resume` - Upload resume (multipart/form-data)

### Jobs (`/api/jobs`)
- `GET /` - List all jobs
- `POST /` - Post new job (recruiter only)
- `GET /my-jobs` - Get recruiter's jobs

### Applications (`/api/applications`)
- `POST /` - Submit job application
- `GET /` - Get user's applications
- `GET /:id` - Get application details

### Interviews (`/api/interview`)
- `POST /start` - Start AI interview
- `POST /answer` - Submit answer during interview
- `POST /end` - End interview session
- `GET /:id` - Get interview details

### Messaging (`/api/messaging`)
- `POST /send` - Send message
- `GET /conversations` - Get user conversations
- WebSocket support for real-time messaging

## 🤖 AI Features

### Interview Service Integration
Uses **Google Gemini AI** for intelligent interview simulations:
- Dynamic question generation based on job/skills
- Real-time answer evaluation
- Personalized feedback
- Interview transcript analysis

### Resume Parser
- PDF text extraction
- Skill & education detection using spaCy NLP
- Structured data extraction

### Skill Gap Analysis
- Compare student skills vs job requirements
- Recommend learning resources (YouTube, Coursera)

### Applicant Shortlisting
- TF-IDF vectorization of job descriptions & resumes
- Cosine similarity scoring
- Ranked candidate recommendations

## 🔐 Authentication

- JWT-based token authentication
- Roles: `student`, `recruiter`, `admin`
- Recruiters require admin approval before posting jobs
- Token expiration: 7 days (configurable)

## 📦 Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + bcryptjs
- Axios for external API calls

**Frontend:**
- React (setup in `/frontend`)
- Responsive UI components

**AI/ML:**
- FastAPI (Python)
- scikit-learn (TF-IDF, cosine similarity)
- spaCy (NLP)
- PyPDF2 (PDF parsing)
- Google Generative AI (Gemini)

**DevOps:**
- Docker & Docker Compose
- Nginx (API Gateway)
- MongoDB

## 📁 Project Structure

```
bu-plac/
├── backend/
│   ├── auth-service/
│   ├── profile-service/
│   ├── job-service/
│   ├── application-service/
│   ├── interview-service/          # AI-powered interviews
│   ├── messaging-service/
│   └── ... (other services)
├── frontend/
│   ├── src/
│   ├── public/
│   └── Dockerfile
├── scripts/
│   ├── check_endpoints.ps1
│   ├── messaging_e2e.ps1
│   └── migrate-job-defaults.js
├── nginx.conf                       # API Gateway config
├── docker-compose.yml
└── package.json
```

## 🔧 Configuration

### Nginx Gateway ([nginx.conf](nginx.conf))
- Routes requests to appropriate microservices
- Handles CORS for all endpoints
- Forwards authentication headers
- Max upload size: 10MB

### Environment Variables

**Core Services:**
```env
MONGODB_URI=mongodb://localhost:27017/placement
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

**AI Services:**
```env
GEMINI_API_KEY=your-api-key
```

## 📝 Database Models

### User (Auth Service)
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: enum['student', 'recruiter', 'admin'],
  approved: Boolean,
  createdAt: Date
}
```

### Student Profile
```javascript
{
  authId: String,
  name: String,
  email: String,
  cgpa: Number,
  skills: [String],
  resumeUrl: String,
  parsed: Boolean
}
```

### Interview Session
```javascript
{
  studentId: String,
  jobId: String,
  status: enum['ongoing', 'completed'],
  chatHistory: [{role, message}],
  score: Number,
  feedback: String,
  createdAt: Date
}
```

## 🧪 Testing

### Check API Endpoints
```bash
# PowerShell
.\scripts\check_endpoints.ps1

# Or manually
curl http://localhost/health
```

### End-to-End Messaging Test
```bash
.\scripts\messaging_e2e.ps1
```

### Run Service Tests
```bash
cd backend/interview-service
npm test
```

## 🚀 Deployment

### Docker Compose
```bash
docker-compose up -d
```

### Individual Service Build
```bash
cd backend/auth-service
docker build -t auth-service:latest .
docker run -p 5001:5001 auth-service:latest
```

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Create Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📧 Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Last Updated:** 2024 | **Version:** 1.0.0