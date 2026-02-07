from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from datetime import date  # Added for date comparison

from app.database import get_db
from app import models, schemas

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)

@router.post("/", status_code=status.HTTP_200_OK)
def mark_attendance(
    attendance: schemas.AttendanceCreate,
    db: Session = Depends(get_db)
):
    # --- NEW: Future Date Validation ---
    if attendance.date > date.today():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Attendance date cannot be in the future. Today is {date.today()}."
        )
    # -----------------------------------

    # 1. Check employee exists
    employee = db.query(models.Employee).filter(
        models.Employee.employee_id == attendance.employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    # 2. Check if attendance already exists for this employee + date
    existing_record = db.query(models.Attendance).filter(
        models.Attendance.employee_id == attendance.employee_id,
        models.Attendance.date == attendance.date
    ).first()

    if existing_record:
        # UPDATE
        existing_record.status = attendance.status
        message = "Attendance updated successfully"
    else:
        # CREATE
        new_record = models.Attendance(**attendance.dict())
        db.add(new_record)
        message = "Attendance marked successfully"

    db.commit()
    return {"message": message}

@router.get("/{employee_id}")
def get_attendance_for_employee(
    employee_id: str,
    db: Session = Depends(get_db)
):
    employee = db.query(models.Employee).filter(
        models.Employee.employee_id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    attendance_records = db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()

    return attendance_records
