from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
import app.models  # Ensure all models are registered with Base metadata
from app.api.v1 import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure database schema is initialized on startup
    Base.metadata.create_all(bind=engine)

    # Bootstrap default canonical demo elder account if missing
    from app.core.database import SessionLocal
    from app.models.user import User, Role
    from app.models.patient import PatientProfile
    from app.models.checklist import DailyChecklistItem, ChecklistItemTime
    from app.core.security import get_password_hash

    db = SessionLocal()
    try:
        demo_email = "eleanor@careflow.com"
        demo_user = db.query(User).filter(User.email == demo_email).first()
        if not demo_user:
            demo_user = User(
                email=demo_email,
                hashed_password=get_password_hash("ElderPass123!"),
                full_name="Eleanor Vance",
                role=Role.ELDER,
                is_active=True
            )
            db.add(demo_user)
            db.commit()
            db.refresh(demo_user)

            profile = db.query(PatientProfile).filter(PatientProfile.user_id == demo_user.id).first()
            if not profile:
                profile = PatientProfile(
                    user_id=demo_user.id,
                    preferred_language="en",
                    timezone="UTC"
                )
                db.add(profile)
                db.commit()
                db.refresh(profile)

                default_items = [
                    DailyChecklistItem(
                        patient_id=profile.id,
                        title="Morning Hydration",
                        description="Drink 2 glasses of fresh water",
                        time_of_day=ChecklistItemTime.MORNING,
                        icon_name="droplet"
                    ),
                    DailyChecklistItem(
                        patient_id=profile.id,
                        title="Gentle Morning Walk",
                        description="15 minutes light stroll or stretching",
                        time_of_day=ChecklistItemTime.MORNING,
                        icon_name="activity"
                    ),
                    DailyChecklistItem(
                        patient_id=profile.id,
                        title="Afternoon Rest & Check",
                        description="Quiet relaxation and fluid check",
                        time_of_day=ChecklistItemTime.AFTERNOON,
                        icon_name="sun"
                    ),
                    DailyChecklistItem(
                        patient_id=profile.id,
                        title="Evening Reading or Music",
                        description="Wind down with calm activities",
                        time_of_day=ChecklistItemTime.EVENING,
                        icon_name="moon"
                    )
                ]
                db.add_all(default_items)
                db.commit()
    except Exception:
        db.rollback()
    finally:
        db.close()

    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
    lifespan=lifespan
)

# Configure Cross-Origin Resource Sharing for Universal Web & Mobile clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API v1 master router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get(f"{settings.API_V1_STR}/health", tags=["System Health"])
def health_check():
    """Verify backend API operational readiness."""
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION
    }
