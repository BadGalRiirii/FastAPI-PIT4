# 📝 Full-Stack To-Do List App — FastAPI + React (Vite)

This project is a simple yet powerful To-Do List web application with a **FastAPI backend** and a **Vite + React frontend**, supporting full CRUD, task filtering, and dark mode.

## 🌐 Live Links

- 🔗 Frontend: [https://fastapi-pit4.netlify.app](https://fastapi-pit4.netlify.app)
- 🔗 Backend: [https://fastapi-pit4.onrender.com](https://fastapi-pit4.onrender.com)

Backend API Endpoints:
POST : https://fastapi-pit4.onrender.com/todos/
GET : https://fastapi-pit4.onrender.com/todos/
PUT : https://fastapi-pit4.onrender.com/todos/{id}
DELETE : https://fastapi-pit4.onrender.com/todos/{id}
GET(filter) : https://fastapi-pit4.onrender.com/todos/filter/{status}

---

## 🛠️ Setup Instructions

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload

### 2.Frontend (React + Vite)
cd frontend
npm install
npm run dev
npm run build

