import enum
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, generate_uuid


class ChecklistItemTime(str, enum.Enum):
    MORNING = "MORNING"
    AFTERNOON = "AFTERNOON"
    EVENING = "EVENING"
    BEDTIME = "BEDTIME"
    ANYTIME = "ANYTIME"


class ChecklistLogStatus(str, enum.Enum):
    COMPLETED = "COMPLETED"
    SKIPPED = "SKIPPED"


class DailyChecklistItem(Base, TimestampMixin):
    __tablename__ = "daily_checklist_items"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    patient_id = Column(String, ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    
    title = Column(String, nullable=False)  # e.g., "Morning Walk (15 mins)", "Drink 2 Glasses of Water"
    description = Column(Text, nullable=True)
    time_of_day = Column(Enum(ChecklistItemTime), default=ChecklistItemTime.MORNING, nullable=False)
    icon_name = Column(String, default="activity", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    # Relationships
    patient = relationship("PatientProfile", back_populates="checklist_items")
    logs = relationship("ChecklistLog", back_populates="item", cascade="all, delete-orphan")


class ChecklistLog(Base, TimestampMixin):
    __tablename__ = "checklist_logs"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    checklist_item_id = Column(String, ForeignKey("daily_checklist_items.id", ondelete="CASCADE"), nullable=False, index=True)
    patient_id = Column(String, ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    
    date = Column(String, nullable=False, index=True)  # YYYY-MM-DD
    status = Column(Enum(ChecklistLogStatus), nullable=False)
    completed_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    reason = Column(String, nullable=True)

    # Relationships
    item = relationship("DailyChecklistItem", back_populates="logs")
