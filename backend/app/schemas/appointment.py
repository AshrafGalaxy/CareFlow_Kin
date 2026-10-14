from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.models.appointment import AppointmentStatus


class AppointmentBase(BaseModel):
    title: str
    doctor_name: str
    clinic_name: Optional[str] = None
    scheduled_at: datetime
    location: Optional[str] = None
    notes: Optional[str] = None
    status: AppointmentStatus = AppointmentStatus.SCHEDULED


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentOut(AppointmentBase):
    id: str
    patient_id: str
    created_at: datetime

    class Config:
        from_attributes = True
