# Jharkhand Societal Innovation Collaboration Portal
> Developed for Smart India Hackathon (SIH 2026) - Problem Statement 26043

A powerful full-stack application connecting citizen problems from grass-root levels across Jharkhand to specialized University faculty, student innovators, and Corporate Social Responsibility (CSR) resources. 

## 🚀 Key Features

*   **Role-based ecosystem:** Distinct dashboards for Citizens, Universities, Faculty, Industry and Government.
*   **AI Pre-Analysis Engine:** Automatically classifies, extracts underlying required skills (e.g. IoT, Civil Engineering), determines urgency, and drafts root-cause hypotheses using Google Gemini AI. (Rule-based fallbacks implemented).
*   **Explainable Matching System:** Deterministic ranking engine linking universities based on geographical proximity, department capacity, and specific expertise vs extracted requirements.
*   **Actionable Dashboards:** Interactive Government Impact Analytics built utilizing Recharts data visualization.

## 🛠 Tech Stack 
- **Frontend**: React (Vite), Tailwind CSS, React-Router, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- **AI Core**: Google Gemini model REST Interface

## 💻 Running Locally

### 1. Build Server Setup
Ensure MongoDB is running locally.

```sh
cd server
npm install
cp .env.example .env 
node utils/seedData.js # Populates system with 2 Demo Challenges, Universities, and Industries
node server.js
```
*Make sure to enter your GOOGLE_GEMINI key in the Server .env for active AI intelligence execution.*

### 2. Client Node
Spawn a second terminal:
```sh
cd client
npm install
npm run dev
```

Visit the designated port to launch the portal. By default, the API binds to port `5000`, and Vite serves on `:5173`.
