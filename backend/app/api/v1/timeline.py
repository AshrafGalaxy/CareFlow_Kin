from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.patient import PatientProfile
from app.models.timeline import TimelineEvent
from app.schemas.timeline import TimelineEventOut
from app.api.deps import get_current_elder_profile

router = APIRouter(prefix="/timeline", tags=["Unified Care Timeline"])


@router.get("", response_model=List[TimelineEventOut])
def get_care_timeline(
    profile: PatientProfile = Depends(get_current_elder_profile),
    db: Session = Depends(get_db)
):
    """Retrieve the chronological unified health and care timeline events."""
    events = db.query(TimelineEvent).filter(
        TimelineEvent.patient_id == profile.id
    ).order_by(TimelineEvent.timestamp.desc()).all()
    return events
