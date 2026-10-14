import enum
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, generate_uuid


class MedicationStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    PAUSED = "PAUSED"
    DISCONTINUED = "DISCONTINUED"


class MedicationLogStatus(str, enum.Enum):
    TAKEN = "TAKEN"
    MISSED = "MISSED"
    SKIPPED = "SKIPPED"
    DEFERRED = "DEFERRED"


class Medication(Base, TimestampMixin):
    __tablename__ = "medications"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    patient_id = Column(String, ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    
    name = Column(String, nullable=False, index=True)
    dosage = Column(String, nullable=False)  # e.g., "50mg", "1 tablet"
    frequency = Column(String, nullable=False)  # e.g., "DAILY", "TWICE_DAILY"
    times_of_day = Column(String, nullable=False)  # JSON or comma-separated times, e.g. "08:00,20:00"
    instructions = Column(Text, nullable=True)  # e.g. "Take after food with water"
    prescribed_by = Column(String, nullable=True)  # Doctor or Clinic name
    status = Column(Enum(MedicationStatus), default=MedicationStatus.ACTIVE, nullable=False)

    # Relationships
    patient = relationship("PatientProfile", back_populates="medications")
    logs = relationship("MedicationLog", back_populates="medication", cascade="all, delete-orphan")


class MedicationLog(Base, TimestampMixin):
    __tablename__ = "medication_logs"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    medication_id = Column(String, ForeignKey("medications.id", ondelete="CASCADE"), nullable=False, index=True)
    patient_id = Column(String, ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    
    scheduled_for = Column(DateTime, nullable=False, index=True)
    taken_at = Column(DateTime, nullable=True)
    status = Column(Enum(MedicationLogStatus), nullable=False)
    reason = Column(String, nullable=True)  # Reason if SKIPPED or DEFERRED
    recorded_by_id = Column(String, ForeignKey("users.id"), nullable=True)

    # Relationships
    medication = relationship("Medication", back_populates="logs")
