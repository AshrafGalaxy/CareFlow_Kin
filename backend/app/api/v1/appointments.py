from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.patient import PatientProfile
from app.models.appointment import Appointment
from app.models.timeline import TimelineEvent, TimelineEventType, PrivacyLevel
from app.schemas.appointment import AppointmentCreate, AppointmentOut
from app.api.deps import get_current_elder_profile

router = APIRouter(prefix="/appointments", tags=["Clinical Appointments"])


@router.get("", response_model=List[AppointmentOut])
def list_appointments(
    profile: PatientProfile = Depends(get_current_elder_profile),
    db: Session = Depends(get_db)
):
    """Retrieve scheduled medical appointments for the elder."""
    records = db.query(Appointment).filter(
        Appointment.patient_id == profile.id
    ).order_by(Appointment.scheduled_at.asc()).all()
    return records


@router.post("", response_model=AppointmentOut, status_code=status.HTTP_201_CREATED)
def create_appointment(
    appt_in: AppointmentCreate,
    profile: PatientProfile = Depends(get_current_elder_profile),
    db: Session = Depends(get_db)
):
    """Schedule a new clinical consultation or checkup."""
    appt = Appointment(
        patient_id=profile.id,
        title=appt_in.title,
        doctor_name=appt_in.doctor_name,
        clinic_name=appt_in.clinic_name,
        scheduled_at=appt_in.scheduled_at,
        location=appt_in.location,
        notes=appt_in.notes,
        status=appt_in.status
    )
    db.add(appt)
    db.commit()
    db.refresh(appt)

    # Timeline event
    timeline = TimelineEvent(
        patient_id=profile.id,
        event_type=TimelineEventType.APPOINTMENT,
        reference_id=appt.id,
        title=f"Appointment Scheduled: {appt.title}",
        description=f"With {appt.doctor_name} at {appt.scheduled_at.strftime('%Y-%m-%d %H:%M')}",
        privacy_level=PrivacyLevel.CARE_CIRCLE
    )
    db.add(timeline)
    db.commit()

    return appt
