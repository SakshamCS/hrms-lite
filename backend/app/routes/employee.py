from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

@router.post("/", response_model=schemas.EmployeeResponse, status_code=status.HTTP_201_CREATED)
def create_employee(
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db)
):
    existing = db.query(models.Employee).filter(
        models.Employee.employee_id == employee.employee_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Employee with this ID already exists"
        )

    new_employee = models.Employee(**employee.dict())
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee


@router.get("/", response_model=list[schemas.EmployeeResponse])
def get_all_employees(db: Session = Depends(get_db)):
    return db.query(models.Employee).all()


@router.delete("/{id}", status_code=status.HTTP_200_OK)
def delete_employee(id: int, db: Session = Depends(get_db)):
    # Filtering by the primary key 'id' instead of the string 'employee_id'
    employee = db.query(models.Employee).filter(models.Employee.id == id).first()

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee record not found"
        )

    db.delete(employee)
    db.commit()
    return {"message": "Employee deleted successfully"}
