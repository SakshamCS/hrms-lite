from pydantic import BaseModel, EmailStr
from datetime import date

# -------- Employee --------
class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class EmployeeResponse(EmployeeCreate):
    id: int

    class Config:
        orm_mode = True


# -------- Attendance --------
class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: str