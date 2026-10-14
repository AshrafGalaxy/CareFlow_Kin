from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel
from app.models.medication import MedicationStatus, MedicationLogStatus


class MedicationBase(BaseModel):
    name: str
    dosage: str
    frequency: str
    times_of_day: str  # e.g., "08:00,20:00"
    instructions: Optional[str] = None
    prescribed_by: Optional[str] = None
    status: MedicationStatus = MedicationStatus.ACTIVE


class MedicationCreate(MedicationBase):
    pass


class MedicationUpdate(BaseModel):
    name: Optional[str] = None
    dosage: Optional[str] = None
    frequency: Optional[str] = None
    times_of_day: Optional[str] = None
    instructions: Optional[str] = None
    prescribed_by: Optional[str] = None
    status: Optional[MedicationStatus] = None


class MedicationLogCreate(BaseModel):
    scheduled_for: datetime
    taken_at: Optional[datetime] = None
    status: MedicationLogStatus
    reason: Optional[str] = None


class MedicationLogOut(BaseModel):
    id: str
    medication_id: str
    patient_id: str
    scheduled_for: datetime
    taken_at: Optional[datetime] = None
    status: MedicationLogStatus
    reason: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class MedicationOut(MedicationBase):
    id: str
    patient_id: str
    created_at: datetime
    updated_at: datetime
    logs: Optional[List[MedicationLogOut]] = []

    class Config:
        from_attributes = True


class AdherenceReport(BaseModel):
    total_scheduled: int
    total_taken: int
    total_missed: int
    total_skipped: int
    adherence_rate_percentage: float
