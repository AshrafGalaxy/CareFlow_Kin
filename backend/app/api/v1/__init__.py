from fastapi import APIRouter
from app.api.v1.auth import router as auth_router
from app.api.v1.elder_home import router as elder_home_router
from app.api.v1.medications import router as medications_router
from app.api.v1.checkins import router as checkins_router
from app.api.v1.checklist import router as checklist_router
from app.api.v1.appointments import router as appointments_router
from app.api.v1.timeline import router as timeline_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(elder_home_router)
api_router.include_router(medications_router)
api_router.include_router(checkins_router)
api_router.include_router(checklist_router)
api_router.include_router(appointments_router)
api_router.include_router(timeline_router)
