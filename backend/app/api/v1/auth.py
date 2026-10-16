from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token, create_refresh_token
from app.models.user import User, Role
from app.models.patient import PatientProfile
from app.models.checklist import DailyChecklistItem, ChecklistItemTime
from app.schemas.auth import UserRegister, UserLogin, GoogleAuthRequest, TokenResponse, UserOut
from app.api.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    """Register a new user and bootstrap elder profile and initial routine items if applicable."""
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists.",
        )
    
    hashed_password = get_password_hash(user_in.password)
    user = User(
        email=user_in.email,
        hashed_password=hashed_password,
        full_name=user_in.full_name,
        phone_number=user_in.phone_number,
        role=user_in.role,
        is_active=True
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Initialize patient profile and default routine items for elders
    if user.role == Role.ELDER:
        profile = PatientProfile(
            user_id=user.id,
            preferred_language="en",
            timezone="UTC"
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)

        # Bootstrap calming, accessible routine items
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

    access_token = create_access_token(user.id, user.role.value)
    refresh_token = create_refresh_token(user.id, user.role.value)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        role=user.role,
        user_id=user.id,
        full_name=user.full_name
    )


@router.post("/login", response_model=TokenResponse)
def login(login_in: UserLogin, db: Session = Depends(get_db)):
    """Authenticate credentials and issue JWT tokens."""
    user = db.query(User).filter(User.email == login_in.email).first()
    if not user or not verify_password(login_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated.",
        )

    access_token = create_access_token(user.id, user.role.value)
    refresh_token = create_refresh_token(user.id, user.role.value)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        role=user.role,
        user_id=user.id,
        full_name=user.full_name
    )


@router.post("/google", response_model=TokenResponse)
def google_auth(payload: GoogleAuthRequest, db: Session = Depends(get_db)):
    """Authenticate or auto-provision user via Google identity with server-authoritative JWT issuance."""
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        random_pwd = get_password_hash(f"google_{payload.email}_{payload.google_id or 'oauth'}")
        user = User(
            email=payload.email,
            hashed_password=random_pwd,
            full_name=payload.full_name,
            role=payload.role,
            is_active=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        if user.role == Role.ELDER:
            profile = PatientProfile(
                user_id=user.id,
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

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is deactivated.",
        )

    access_token = create_access_token(user.id, user.role.value)
    refresh_token = create_refresh_token(user.id, user.role.value)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        role=user.role,
        user_id=user.id,
        full_name=user.full_name
    )


@router.get("/me", response_model=UserOut)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Retrieve details for the active authenticated user."""
    return current_user
