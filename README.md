###🧑‍💼 HRMS Lite – Full-Stack Application

A lightweight Human Resource Management System (HRMS Lite) built as a full-stack web application.
The system allows an admin to manage employees and track daily attendance through a clean, professional UI and a RESTful backend.

This project was built as a practical full-stack assignment, with a focus on clarity, correctness, usability, and real-world design decisions, rather than excessive features.

⸻

###🚀 Live Demo

	•	Frontend (Vercel):
👉 
	•	Backend API (Render):
👉 
	•	API Documentation (Swagger UI):
👉 /docs

⸻

###🧩 Features

###Employee Management
	•	Add new employees (unique Employee ID)
	•	View all employees
	•	Delete employees
	•	Server-side validation:
	•	Required fields
	•	Valid email format
	•	Duplicate employee handling

###Attendance Management

	•	Mark daily attendance (Present / Absent)
	•	Update attendance for the same employee & date (no duplicates)
	•	View attendance history per employee
	•	Search employees by name or employee ID for scalable selection
	
UX & UI
```text
	•	Clean, professional interface
	•	Search-based employee selection (scales better than dropdowns)
	•	Loading, empty, and error states
	•	Reusable UI components
	•	Responsive layout
```
⸻

🛠️ Tech Stack

Frontend
```text
	•	React (Vite)
	•	Tailwind CSS
	•	Axios
	•	React Router
```
Backend
```text
	•	FastAPI
	•	SQLAlchemy
	•	PostgreSQL
	•	Swagger UI (OpenAPI)
```
Deployment
```text
	•	Frontend: Vercel
	•	Backend: Render
	•	Database: Render PostgreSQL
```
⸻

🧠 Design Decisions
```text
	•	No authentication: Assumes a single admin user (as per assignment scope)
	•	Attendance upsert logic:
One attendance record per employee per date (updates allowed)
	•	Frontend filtering for employee search:
Faster UX and simpler architecture for this scale
	•	Swagger UI enabled:
Intentionally kept on for API exploration and review
```
⸻

📁 Project Structure

```text
hrms-lite/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── main.py
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
├── README.md
└── .gitignore
```
⸻

⚙️ Running the Project Locally

Backend Setup

```text
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
Set environment variable:
```text
export DATABASE_URL=postgresql://<user>:<password>@<host>/<db>
```
Run server:
```text
uvicorn app.main:app --reload
```
Backend runs at:
```text
http://127.0.0.1:8000
```
Swagger UI:
```text
http://127.0.0.1:8000/docs
```

⸻

Frontend Setup

```text
cd frontend
npm install
```
Create .env file:
```text
VITE_API_URL=http://127.0.0.1:8000
```
Run frontend:
```text
npm run dev
```
Frontend runs at:
```text
http://localhost:5173
```

⸻

🧪 API Documentation

The backend API is fully documented using Swagger UI, which allows:
	•	Exploring endpoints
	•	Testing requests
	•	Viewing request/response schemas

Available at:

/docs


⸻

⚠️ Assumptions & Limitations
	•	Single admin user (no authentication)
	•	Leave management, payroll, and roles are out of scope
	•	Designed for small–to–medium internal HR usage
	•	Frontend search is client-side (sufficient for current scale)

⸻

🌱 Possible Enhancements
	•	Authentication & role-based access
	•	Attendance analytics & dashboards
	•	Pagination for large datasets
	•	Bulk attendance entry
	•	Server-side search for very large organizations

⸻

✅ Status

✔ Core functionality complete
✔ Fully deployed
✔ Production-ready structure
✔ Clean and maintainable codebase

⸻
