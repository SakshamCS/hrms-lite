from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

@router.get("/", response_model=list[schemas.EmployeeResponse])
def get_all_employees(db: Session = Depends(get_db)):
    return db.query(models.Employee).all()

@router.post("/", response_model=schemas.EmployeeResponse, status_code=status.HTTP_201_CREATED)
def create_employee(
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db)
):
    existing = db.query(models.Employee).filter(
        models.Employee.employee_id == employee.employee_id
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail="Employee already exists")
    
    new_employee = models.Employee(**employee.dict())
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee

@router.delete("/{id}", status_code=status.HTTP_200_OK)
def delete_employee(id: int, db: Session = Depends(get_db)):
    # 1. Find the employee
    employee = db.query(models.Employee).filter(models.Employee.id == id).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    try:
        # 2. Delete linked attendance records first to avoid Foreign Key errors
        db.query(models.Attendance).filter(models.Attendance.employee_id == employee.employee_id).delete()
        
        # 3. Now delete the employee
        db.delete(employee)
        db.commit()
        return {"message": "Employee and their attendance records deleted"}
    except Exception as e:
        db.rollback()
        print(f"DELETE ERROR: {str(e)}") # This will show up in Render Logs
        raise HTTPException(status_code=500, detail="Database error: Check if employee has linked records")
