from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import employee, attendance

app = FastAPI(title="HRMS Lite")


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # Allows every domain (Vercel, Localhost, etc.)
    allow_credentials=False,       # Turned off as requested
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee.router)
app.include_router(attendance.router)

@app.get("/")
def health_check():
    return {"status": "ok"}
