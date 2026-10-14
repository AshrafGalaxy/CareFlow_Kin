from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict
from app.models.checkin import CheckInStatus


class CheckInCreate(BaseModel):
    date: str  # YYYY-MM-DD
    status: CheckInStatus
    notes: Optional[str] = None


class CheckInOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    patient_id: str
    date: str
    status: CheckInStatus
    notes: Optional[str] = None
    recorded_at: datetime
    created_at: datetime
