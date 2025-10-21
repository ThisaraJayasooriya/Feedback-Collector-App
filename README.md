# Feedback Collector App

A simple full-stack feedback collector application with a Next.js frontend and an Express + MongoDB backend.

This README explains how to run the project locally and how to push it to GitHub.

## Repository structure

- backend/ - Express server, Mongoose models and routes
- frontend/ - Next.js (App Router) frontend

## Prerequisites

- Node.js (>= 18 recommended)
- npm
- MongoDB (Atlas or local)
- Git

## Setup

1. Clone the repository (if not already cloned):

```bash
git clone <your-repo-url>
cd Feedback-Collector-App
```

2. Install dependencies for backend and frontend:

```powershell
cd backend
npm install
cd ..\frontend
npm install
cd ..
```

## Environment variables

Create a `.env` file in the `backend` directory with the following variable:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000 # optional
```

## Running the application locally

Start the backend (development):

```powershell
cd backend
npm run dev
```

Start the frontend:

```powershell
cd frontend
npm run dev
```

- Frontend will run on http://localhost:3000 (default Next.js port)
- Backend will run on http://localhost:5000 (or the port specified in your `.env`)
- The frontend connects to backend API at `http://localhost:5000/api/feedback` (default)

## Build for production

Build frontend:

```powershell
cd frontend
npm run build
npm start
```

Start backend in production mode:

```powershell
cd backend
npm start
```

## API

- POST /api/feedback — add a new feedback (body: { name, message })
- GET /api/feedback — list all feedbacks

## Git and GitHub

1. Create a GitHub repository (on GitHub).
2. Add remote and push:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```

If you've already pushed and simply want to add the README and push:

```bash
git add README.md
git commit -m "Add repository README"
git push
```

## Notes

- The frontend uses Tailwind and Next.js Turbopack for dev/build. If you encounter errors, try running the standard `next` commands without `--turbopack`.
- Ensure your MongoDB URI is accessible from your host (for remote DB check IP access or credentials).

## Contribution

Pull requests are welcome. Please open an issue for major changes.


