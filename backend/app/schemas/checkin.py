from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.models.checkin import CheckInStatus


class CheckInCreate(BaseModel):
    date: str  # YYYY-MM-DD
    status: CheckInStatus
    notes: Optional[str] = None


class CheckInOut(BaseModel):
    id: str
    patient_id: str
    date: str
    status: CheckInStatus
    notes: Optional[str] = None
    recorded_at: datetime
    created_at: datetime

    class Config:
        from_attributes = True
