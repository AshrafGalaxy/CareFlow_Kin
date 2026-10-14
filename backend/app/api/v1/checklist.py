from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.patient import PatientProfile
from app.models.checklist import DailyChecklistItem, ChecklistLog, ChecklistLogStatus
from app.models.timeline import TimelineEvent, TimelineEventType, PrivacyLevel
from app.schemas.checklist import ChecklistItemOut
from app.api.deps import get_current_elder_profile

router = APIRouter(prefix="/checklist", tags=["Daily Routine Checklist"])


class SkipReason(BaseModel):
    reason: Optional[str] = None


@router.get("/today", response_model=List[ChecklistItemOut])
def get_today_checklist(
    profile: PatientProfile = Depends(get_current_elder_profile),
    db: Session = Depends(get_db)
):
    """Retrieve daily checklist items merged with today's completion state."""
    today_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    
    items = db.query(DailyChecklistItem).filter(
        DailyChecklistItem.patient_id == profile.id,
        DailyChecklistItem.is_active == True
    ).all()
    
    logs = db.query(ChecklistLog).filter(
        ChecklistLog.patient_id == profile.id,
        ChecklistLog.date == today_str
    ).all()
    log_map = {log.checklist_item_id: log for log in logs}

    output = []
    for item in items:
        item_log = log_map.get(item.id)
        status_val = item_log.status if item_log else None
        completed_at = item_log.completed_at if item_log else None
        
        output.append(
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
    return output


@router.post("/{item_id}/complete", response_model=ChecklistItemOut)
def complete_checklist_item(
    item_id: str,
    profile: PatientProfile = Depends(get_current_elder_profile),
    db: Session = Depends(get_db)
):
    """Mark a routine activity complete for today."""
    item = db.query(DailyChecklistItem).filter(
        DailyChecklistItem.id == item_id,
        DailyChecklistItem.patient_id == profile.id
    ).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Checklist item not found for active patient.",
        )

    today_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    now = datetime.now(timezone.utc)

    log = db.query(ChecklistLog).filter(
        ChecklistLog.checklist_item_id == item.id,
        ChecklistLog.date == today_str
    ).first()

    if log:
        log.status = ChecklistLogStatus.COMPLETED
        log.completed_at = now
    else:
        log = ChecklistLog(
            checklist_item_id=item.id,
            patient_id=profile.id,
            date=today_str,
            status=ChecklistLogStatus.COMPLETED,
            completed_at=now
        )
        db.add(log)

    db.commit()

    # Timeline event
    timeline = TimelineEvent(
        patient_id=profile.id,
        event_type=TimelineEventType.CHECKLIST,
        reference_id=log.id,
        title=f"Routine Completed: {item.title}",
        description=f"Completed {item.time_of_day.value.lower()} activity.",
        privacy_level=PrivacyLevel.CARE_CIRCLE
    )
    db.add(timeline)
    db.commit()

    return ChecklistItemOut(
        id=item.id,
        patient_id=item.patient_id,
        title=item.title,
        description=item.description,
        time_of_day=item.time_of_day,
        icon_name=item.icon_name,
        is_active=item.is_active,
        today_status=ChecklistLogStatus.COMPLETED,
        completed_at=now
    )


@router.post("/{item_id}/skip", response_model=ChecklistItemOut)
def skip_checklist_item(
    item_id: str,
    skip_data: SkipReason,
    profile: PatientProfile = Depends(get_current_elder_profile),
    db: Session = Depends(get_db)
):
    """Mark a routine activity skipped for today with optional reason."""
    item = db.query(DailyChecklistItem).filter(
        DailyChecklistItem.id == item_id,
        DailyChecklistItem.patient_id == profile.id
    ).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Checklist item not found for active patient.",
        )

    today_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    now = datetime.now(timezone.utc)

    log = db.query(ChecklistLog).filter(
        ChecklistLog.checklist_item_id == item.id,
        ChecklistLog.date == today_str
    ).first()

    if log:
        log.status = ChecklistLogStatus.SKIPPED
        log.reason = skip_data.reason
        log.completed_at = now
    else:
        log = ChecklistLog(
            checklist_item_id=item.id,
            patient_id=profile.id,
            date=today_str,
            status=ChecklistLogStatus.SKIPPED,
            completed_at=now,
            reason=skip_data.reason
        )
        db.add(log)

    db.commit()

    return ChecklistItemOut(
        id=item.id,
        patient_id=item.patient_id,
        title=item.title,
        description=item.description,
        time_of_day=item.time_of_day,
        icon_name=item.icon_name,
        is_active=item.is_active,
        today_status=ChecklistLogStatus.SKIPPED,
        completed_at=now
    )
