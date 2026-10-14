# Careflow

> **Connected Care Platform & Elder Companion**  
> Built with an elder-first universal architecture supporting Web (Desktop & Decks), iOS, and Android from a single responsive codebase.

---

## Architectural Overview

Careflow is engineered to support elderly individuals, their families, and care providers with routine adherence, emotional well-being monitoring, and clinical coordination.

```
Elderly_Careflow/
├── .github/workflows/ci.yml      # Automated GitHub Actions test & verification pipeline
├── AGENTS.md                     # Agent directives, 50/72 commit rules, and anti-pattern ledger
├── backend/                      # Python 3.11+ / FastAPI asynchronous REST service
│   ├── app/
│   │   ├── core/                 # Config, security (bcrypt & JWT), database session
│   │   ├── models/               # SQLAlchemy models (User, Patient, Meds, Checkin, Timeline)
│   │   ├── schemas/              # Strongly typed Pydantic v2 validation contracts
│   │   └── api/v1/               # Domain routers (auth, elder/home, medications, checklist, etc.)
│   ├── tests/                    # Automated Pytest suite (100% passing)
│   └── requirements.txt
└── client/                       # Universal Expo + React Native Web client (TypeScript)
    ├── app/                      # Expo Router responsive file-based navigation tree
    ├── components/               # WCAG AAA accessible components (BigButton, StatusCard)
    ├── constants/theme.ts        # Design tokens (Sanctuary Teal, Amber Glow, Calm Alabaster)
    └── services/api.ts           # Typed Axios client with JWT session management
```

---

## Design System & Ergonomics

The user interface adheres to strict **WCAG 2.1 AAA** contrast standards to assist older adults and users with motor tremors or visual degradation:

- **Sanctuary Teal (`#0D5C52`)**: Primary brand and headers (>11:1 contrast against white).
- **Calm Alabaster (`#F8FAF8`)**: Anti-glare background tone minimizing optical strain.
- **Amber Glow (`#B45309`)**: High-priority routine reminders and gentle attention calls.
- **Evergreen (`#15803D`)**: Affirmative status for taken medications and completed routines.
- **Deep Charcoal (`#1E293B`)**: High-contrast body typography (13.8:1 contrast).
- **Touch Targets**: Minimum 56px height/width with 16px margins to prevent mis-taps.
- **Cross-Platform Responsive Decks**: Adaptive layouts rendering multi-column decks on desktop screens and streamlined single-column flows on mobile devices.

---

## Core Capabilities Delivered

1. **Elder Dashboard Deck (`/elder/home`)**: Aggregated morning-to-evening care overview with personalized greetings, wellness check-in status, routine checklists, and upcoming clinical consultations.
2. **Medication Adherence Engine**: Prescriptions management, taken/skipped dose logging, and empirical adherence rate calculations.
3. **Daily Wellness Check-In**: 4-point emotive wellness state tracker (`GOOD`, `OKAY`, `NOT_WELL`, `NEEDS_HELP`) with care circle notifications.
4. **Routine Activity Checklist**: Daily step-by-step checklist supporting 1-tap completions and skip reasons.
5. **Care Timeline**: Unified chronological stream recording all clinical, medication, and routine events.
6. **Server-Authoritative RBAC**: Role-based authentication (`ELDER`, `FAMILY_GUARDIAN`, `LOCAL_CARE_PARTNER`, `DOCTOR`, `PROVIDER_ADMIN`) with JWT security.

---

## Local Development & Verification

### Backend Service (FastAPI)
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate       # On Windows
pip install -r requirements.txt
pytest tests/ -v               # Run test suite
uvicorn app.main:app --reload  # Launch server on http://localhost:8000
```
API Documentation is accessible at `http://localhost:8000/api/v1/docs`.

### Universal Client (Web & Mobile)
```bash
cd client
npm install
npx tsc --noEmit               # Static TypeScript typecheck
npx expo start --web           # Launch interactive web client on http://localhost:8081
```

---

## Continuous Integration

Every push and pull request is validated through GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)), executing:
- Automated backend Pytest execution against an isolated database.
- Universal client TypeScript type checking and export readiness.
