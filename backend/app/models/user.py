import enum
from sqlalchemy import Column, String, Boolean, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin, generate_uuid


class Role(str, enum.Enum):
    ELDER = "ELDER"
    FAMILY_GUARDIAN = "FAMILY_GUARDIAN"
    LOCAL_CARE_PARTNER = "LOCAL_CARE_PARTNER"
    DOCTOR = "DOCTOR"
    PROVIDER_ADMIN = "PROVIDER_ADMIN"


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    phone_number = Column(String, nullable=True)
    role = Column(Enum(Role), default=Role.ELDER, nullable=False, index=True)
    is_active = Column(Boolean, default=True, nullable=False)

    # Relationships
    patient_profile = relationship("PatientProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
