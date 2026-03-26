# LifeLink+ Healthcare Platform

A medical crowdfunding and emergency assistance platform.

## Deployment Instructions

### 1. Backend (Render)
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `PORT`: 5000 (Render sets this automatically)
  - `MONGO_URI`: Your MongoDB Atlas URI
  - `JWT_SECRET`: A secure random string
  - `NODE_ENV`: production

### 2. Frontend (Vercel)
- **Root Directory**: `frontend`
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: Your Render backend URL (e.g., `https://lifeline-api.onrender.com/api`)

## Local Development
1. Clone the repo
2. Inside `backend/`, copy `.env.example` to `.env` and configure.
3. Run `npm run dev` in both `frontend/` and `backend/`.
