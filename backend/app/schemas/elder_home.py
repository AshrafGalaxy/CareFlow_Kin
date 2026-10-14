from typing import Optional, List
from pydantic import BaseModel
from app.schemas.checkin import CheckInOut
from app.schemas.checklist import ChecklistItemOut
from app.schemas.medication import MedicationOut
from app.schemas.appointment import AppointmentOut


class ElderHomeResponse(BaseModel):
    greeting: str
    date: str
    elder_name: str
    today_checkin: Optional[CheckInOut] = None
    checklist_items: List[ChecklistItemOut] = []
    checklist_completed_count: int = 0
    checklist_total_count: int = 0
    next_medications: List[MedicationOut] = []
    upcoming_appointment: Optional[AppointmentOut] = None
    adherence_rate_percentage: float = 100.0
