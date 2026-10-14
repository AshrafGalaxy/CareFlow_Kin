from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.models.checklist import ChecklistItemTime, ChecklistLogStatus


class ChecklistItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    time_of_day: ChecklistItemTime = ChecklistItemTime.MORNING
    icon_name: str = "activity"
    is_active: bool = True


class ChecklistItemCreate(ChecklistItemBase):
    pass


class ChecklistLogCreate(BaseModel):
    status: ChecklistLogStatus
    reason: Optional[str] = None


class ChecklistLogOut(BaseModel):
    id: str
    checklist_item_id: str
    patient_id: str
    date: str
    status: ChecklistLogStatus
    completed_at: datetime
    reason: Optional[str] = None

    class Config:
        from_attributes = True


class ChecklistItemOut(ChecklistItemBase):
    id: str
    patient_id: str
    today_status: Optional[ChecklistLogStatus] = None
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True
