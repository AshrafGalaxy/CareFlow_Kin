from datetime import datetime, timezone
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.patient import PatientProfile
from app.models.medication import Medication, MedicationLog, MedicationStatus, MedicationLogStatus
from app.models.timeline import TimelineEvent, TimelineEventType, PrivacyLevel
from app.models.audit import AuditEvent
from app.schemas.medication import (
    MedicationCreate,
    MedicationOut,
    MedicationLogCreate,
    MedicationLogOut,
    AdherenceReport
)
from app.api.deps import get_current_elder_profile, get_current_user
from app.models.user import User

router = APIRouter(prefix="/medications", tags=["Medications"])


@router.get("", response_model=List[MedicationOut])
def list_medications(
    profile: PatientProfile = Depends(get_current_elder_profile),
    db: Session = Depends(get_db)
):
    """Retrieve all prescribed medications for the active elder."""
    meds = db.query(Medication).filter(Medication.patient_id == profile.id).all()
    return meds


@router.post("", response_model=MedicationOut, status_code=status.HTTP_201_CREATED)
def create_medication(
    med_in: MedicationCreate,
    profile: PatientProfile = Depends(get_current_elder_profile),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Register a new prescribed medication."""
    med = Medication(
        patient_id=profile.id,
        name=med_in.name,
        dosage=med_in.dosage,
        frequency=med_in.frequency,
        times_of_day=med_in.times_of_day,
        instructions=med_in.instructions,
        prescribed_by=med_in.prescribed_by,
        status=med_in.status
    )
    db.add(med)
    db.commit()
    db.refresh(med)

    # Record Timeline Event
    timeline = TimelineEvent(
        patient_id=profile.id,
        event_type=TimelineEventType.MEDICATION,
        reference_id=med.id,
        title=f"Medication Prescribed: {med.name}",
        description=f"Dosage: {med.dosage}, Schedule: {med.times_of_day}",
        privacy_level=PrivacyLevel.CARE_CIRCLE
    )
    db.add(timeline)

    # Record Audit Event
    audit = AuditEvent(
        actor_id=current_user.id,
        action="MEDICATION_CREATED",
        entity_type="Medication",
        entity_id=med.id
    )
    db.add(audit)
    db.commit()

    return med


@router.post("/{medication_id}/logs", response_model=MedicationLogOut, status_code=status.HTTP_201_CREATED)
def log_medication_intake(
    medication_id: str,
    log_in: MedicationLogCreate,
    profile: PatientProfile = Depends(get_current_elder_profile),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Record taking or skipping a scheduled medication dose."""
    med = db.query(Medication).filter(
        Medication.id == medication_id,
        Medication.patient_id == profile.id
    ).first()
    if not med:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medication not found for active patient.",
        )

    taken_timestamp = log_in.taken_at or datetime.now(timezone.utc) if log_in.status == MedicationLogStatus.TAKEN else None

    med_log = MedicationLog(
        medication_id=med.id,
        patient_id=profile.id,
        scheduled_for=log_in.scheduled_for,
        taken_at=taken_timestamp,
        status=log_in.status,
        reason=log_in.reason,
        recorded_by_id=current_user.id
    )
    db.add(med_log)
    db.commit()
    db.refresh(med_log)

    # Generate Timeline Event
    status_label = "taken" if log_in.status == MedicationLogStatus.TAKEN else f"marked {log_in.status.value.lower()}"
    timeline = TimelineEvent(
        patient_id=profile.id,
        event_type=TimelineEventType.MEDICATION,
        reference_id=med_log.id,
        title=f"{med.name} {status_label}",
        description=f"Dosage: {med.dosage}. {('Reason: ' + log_in.reason) if log_in.reason else ''}".strip(),
        privacy_level=PrivacyLevel.CARE_CIRCLE
    )
    db.add(timeline)
    db.commit()

    return med_log


@router.get("/adherence", response_model=AdherenceReport)
def get_adherence_summary(
    profile: PatientProfile = Depends(get_current_elder_profile),
    db: Session = Depends(get_db)
):
    """Compute empirical medication adherence metrics."""
    total = db.query(MedicationLog).filter(MedicationLog.patient_id == profile.id).count()
    taken = db.query(MedicationLog).filter(
        MedicationLog.patient_id == profile.id,
        MedicationLog.status == MedicationLogStatus.TAKEN
    ).count()
    missed = db.query(MedicationLog).filter(
        MedicationLog.patient_id == profile.id,
        MedicationLog.status == MedicationLogStatus.MISSED
    ).count()
    skipped = db.query(MedicationLog).filter(
        MedicationLog.patient_id == profile.id,
        MedicationLog.status == MedicationLogStatus.SKIPPED
    ).count()

    rate = (taken / total * 100.0) if total > 0 else 100.0

    return AdherenceReport(
        total_scheduled=total,
        total_taken=taken,
        total_missed=missed,
        total_skipped=skipped,
        adherence_rate_percentage=round(rate, 1)
    )
