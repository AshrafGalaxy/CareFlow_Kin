from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.patient import PatientProfile
from app.models.checkin import DailyCheckIn
from app.models.checklist import DailyChecklistItem, ChecklistLog, ChecklistLogStatus
from app.models.medication import Medication, MedicationLog, MedicationStatus, MedicationLogStatus
from app.models.appointment import Appointment, AppointmentStatus
from app.schemas.elder_home import ElderHomeResponse
from app.schemas.checkin import CheckInOut
from app.schemas.checklist import ChecklistItemOut
from app.schemas.medication import MedicationOut
from app.schemas.appointment import AppointmentOut
from app.api.deps import get_current_elder_profile

router = APIRouter(prefix="/elder", tags=["Elder Home Experience"])


@router.get("/home", response_model=ElderHomeResponse)
def get_elder_home_deck(
    profile: PatientProfile = Depends(get_current_elder_profile),
    db: Session = Depends(get_db)
):
    """Aggregate core morning-to-evening care deck for the elder user."""
    now = datetime.now(timezone.utc)
    today_str = now.strftime("%Y-%m-%d")
    display_date = now.strftime("%A, %b %d")
    
    # Time-appropriate calm greeting
    hour = now.hour
    if hour < 12:
        greeting_prefix = "Good morning"
    elif hour < 17:
        greeting_prefix = "Good afternoon"
    else:
        greeting_prefix = "Good evening"
        
    elder_name = profile.user.full_name if profile.user else "Friend"
    greeting = f"{greeting_prefix}, {elder_name}"

    # 1. Today's Wellness Check-In
    checkin_record = db.query(DailyCheckIn).filter(
        DailyCheckIn.patient_id == profile.id,
        DailyCheckIn.date == today_str
    ).first()
    today_checkin = CheckInOut.model_validate(checkin_record) if checkin_record else None

    # 2. Daily Routine Checklist Items with Today's Status
    items = db.query(DailyChecklistItem).filter(
        DailyChecklistItem.patient_id == profile.id,
        DailyChecklistItem.is_active == True
    ).all()
    
    logs = db.query(ChecklistLog).filter(
        ChecklistLog.patient_id == profile.id,
        ChecklistLog.date == today_str
    ).all()
    log_map = {log.checklist_item_id: log for log in logs}

    checklist_out = []
    completed_count = 0
    for item in items:
        item_log = log_map.get(item.id)
        status_val = item_log.status if item_log else None
        completed_at = item_log.completed_at if item_log else None
        if status_val == ChecklistLogStatus.COMPLETED:
            completed_count += 1
            
        checklist_out.append(
            ChecklistItemOut(
                id=item.id,
                patient_id=item.patient_id,
                title=item.title,
                description=item.description,
                time_of_day=item.time_of_day,
                icon_name=item.icon_name,
                is_active=item.is_active,
                today_status=status_val,
                completed_at=completed_at
            )
        )

    # 3. Medications Active and Scheduled
    medications = db.query(Medication).filter(
        Medication.patient_id == profile.id,
        Medication.status == MedicationStatus.ACTIVE
    ).all()
    meds_out = [MedicationOut.model_validate(m) for m in medications]

    # 4. Next Upcoming Clinical Appointment
    upcoming_appt = db.query(Appointment).filter(
        Appointment.patient_id == profile.id,
        Appointment.scheduled_at >= now,
        Appointment.status == AppointmentStatus.SCHEDULED
    ).order_by(Appointment.scheduled_at.asc()).first()
    appt_out = AppointmentOut.model_validate(upcoming_appt) if upcoming_appt else None

    # 5. Adherence Rate Calculation
    total_logs = db.query(MedicationLog).filter(
        MedicationLog.patient_id == profile.id
    ).count()
    taken_logs = db.query(MedicationLog).filter(
        MedicationLog.patient_id == profile.id,
        MedicationLog.status == MedicationLogStatus.TAKEN
    ).count()
    adherence_rate = (taken_logs / total_logs * 100.0) if total_logs > 0 else 100.0

    return ElderHomeResponse(
        greeting=greeting,
        date=display_date,
        elder_name=elder_name,
        today_checkin=today_checkin,
        checklist_items=checklist_out,
        checklist_completed_count=completed_count,
        checklist_total_count=len(checklist_out),
        next_medications=meds_out,
        upcoming_appointment=appt_out,
        adherence_rate_percentage=round(adherence_rate, 1)
    )
