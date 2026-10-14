import enum
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, generate_uuid


class CheckInStatus(str, enum.Enum):
    GOOD = "GOOD"
    OKAY = "OKAY"
    NOT_WELL = "NOT_WELL"
    NEEDS_HELP = "NEEDS_HELP"


class DailyCheckIn(Base, TimestampMixin):
    __tablename__ = "daily_checkins"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    patient_id = Column(String, ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    
    date = Column(String, nullable=False, index=True)  # YYYY-MM-DD
    status = Column(Enum(CheckInStatus), nullable=False)
    notes = Column(Text, nullable=True)  # Optional verbal/text note, e.g. "Slight headache after breakfast"
    recorded_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    patient = relationship("PatientProfile", back_populates="checkins")
