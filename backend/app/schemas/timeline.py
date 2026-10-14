from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict
from app.models.timeline import TimelineEventType, PrivacyLevel


class TimelineEventOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    patient_id: str
    event_type: TimelineEventType
    reference_id: Optional[str] = None
    title: str
    description: Optional[str] = None
    timestamp: datetime
    privacy_level: PrivacyLevel
    created_at: datetime
