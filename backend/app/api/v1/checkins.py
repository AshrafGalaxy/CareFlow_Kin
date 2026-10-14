from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.patient import PatientProfile
from app.models.checkin import DailyCheckIn, CheckInStatus
from app.models.timeline import TimelineEvent, TimelineEventType, PrivacyLevel
from app.schemas.checkin import CheckInCreate, CheckInOut
from app.api.deps import get_current_elder_profile

router = APIRouter(prefix="/checkins", tags=["Daily Wellness Check-In"])


@router.post("", response_model=CheckInOut, status_code=status.HTTP_201_CREATED)
def submit_checkin(
    checkin_in: CheckInCreate,
    profile: PatientProfile = Depends(get_current_elder_profile),
    db: Session = Depends(get_db)
):
    """Record or update elder's daily emotional and physical wellness check-in."""
    existing = db.query(DailyCheckIn).filter(
        DailyCheckIn.patient_id == profile.id,
        DailyCheckIn.date == checkin_in.date
    ).first()

    if existing:
        existing.status = checkin_in.status
        existing.notes = checkin_in.notes
        checkin_obj = existing
    else:
        checkin_obj = DailyCheckIn(
            patient_id=profile.id,
            date=checkin_in.date,
            status=checkin_in.status,
            notes=checkin_in.notes
        )
        db.add(checkin_obj)
        
    db.commit()
    db.refresh(checkin_obj)

    # Log to unified timeline
    status_text = checkin_obj.status.value.replace("_", " ").title()
    timeline = TimelineEvent(
        patient_id=profile.id,
        event_type=TimelineEventType.CHECKIN,
        reference_id=checkin_obj.id,
        title=f"Wellness Check-In: {status_text}",
        description=checkin_obj.notes or f"Elder reported feeling {status_text.lower()} today.",
        privacy_level=PrivacyLevel.CARE_CIRCLE
    )
    db.add(timeline)
    db.commit()

    return checkin_obj


@router.get("/history", response_model=List[CheckInOut])
def get_checkin_history(
    profile: PatientProfile = Depends(get_current_elder_profile),
    db: Session = Depends(get_db)
):
    """Retrieve chronological history of daily wellness check-ins."""
    records = db.query(DailyCheckIn).filter(
        DailyCheckIn.patient_id == profile.id
    ).order_by(DailyCheckIn.date.desc()).all()
    return records
