# Careflow

Careflow is a connected-care platform for older adults, their families, and care providers.

It helps an elder keep a daily routine: medications, checklists, wellness check-ins, appointments, and a shared care timeline. The same Expo codebase runs on web, iOS, and Android.

Please follow [CONTRIBUTING.md](CONTRIBUTING.md) before you change code.

---

## What works today

Phase 1 (core elder experience) is the current foundation:

- Sign in and role-based access (`ELDER`, `FAMILY_GUARDIAN`, `LOCAL_CARE_PARTNER`, `DOCTOR`, `PROVIDER_ADMIN`)
- Elder home overview
- Medication logging and adherence
- Daily wellness check-in (`GOOD`, `OKAY`, `NOT_WELL`, `NEEDS_HELP`)
- Daily routine checklist
- Appointments
- Care timeline

Later work (care circle tokens, SOS escalation, live calls, AI) is **out of scope** until the matching phase is assigned. Do not add those features early. See the phase documents below.

---

## Stack

| Layer | Technology |
| :--- | :--- |
| Client | Expo, React Native, TypeScript, Expo Router |
| API | Python 3.11+, FastAPI |
| Data | SQLite for local development (override with `DATABASE_URL` for PostgreSQL) |
| Auth | JWT, bcrypt password hashing, server-side role checks |

The client talks to the API through a typed Axios client. Access control lives on the **server**, not in hidden UI.

---

## Repository layout

```
Careflow/
├── backend/          FastAPI service, models, schemas, tests
├── client/           Expo app (web, iOS, Android)
├── .githooks/        Team git hooks (commit, push, secret checks)
├── .github/          CI pipeline
├── AGENTS.md         Team engineering rules
├── CONTRIBUTING.md   How teammates work in this repo
└── DESIGN_SYSTEM.md  Visual and accessibility rules
```

---

## Prerequisites

- Python 3.11 or newer
- Node.js 20 or newer
- Git
- For mobile: Expo Go on a phone, or an iOS / Android simulator

---

## Run locally

Use two terminals: one for the API, one for the client.

### 1. Backend

```bash
cd backend
python -m venv .venv
```

Windows (PowerShell):

```powershell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
pytest tests/ -v
uvicorn app.main:app --reload
```

macOS / Linux:

```bash
source .venv/bin/activate
pip install -r requirements.txt
pytest tests/ -v
uvicorn app.main:app --reload
```

The API starts at `http://localhost:8000`.

- Health: `http://localhost:8000/api/v1/health`
- Swagger docs: `http://localhost:8000/api/v1/docs`

Optional environment variables (do **not** commit `.env` files):

- `SECRET_KEY` — required in production; a development default exists locally
- `DATABASE_URL` — defaults to a local SQLite file

### 2. Client

```bash
cd client
npm install
npm run typecheck
npx expo start --web
```

Web client: `http://localhost:8081`.

Other useful commands:

```bash
npx expo start           # choose web, iOS, or Android
npx expo start --android
npx expo start --ios
```

Keep the backend running while you use the app.

### 3. Demo login (local only)

On first API start, a demo elder account is created if it does not exist:

- Email: `eleanor@careflow.com`
- Password: `ElderPass123!`

Use this only on your machine. Do not treat it as a production credential.

---

## Verify before you share work

Run the same checks that CI and git hooks expect:

```bash
# from backend/
pytest tests/ -v

# from client/
npm run typecheck
```

GitHub Actions also runs these on every push and pull request to `main`.

---

## Documentation

| Document | Purpose |
| :--- | :--- |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Team workflow, commits, hooks, pull requests |
| [AGENTS.md](AGENTS.md) | Full engineering protocols |
| [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | Color, type, spacing, accessibility |
| [SECURITY.md](SECURITY.md) | How to report security issues |
| [Phase 1 — Core elder experience](CAREFLOW_PHASE_1_CORE_PLATFORM_ELDER_EXPERIENCE.md) | Current foundation |
| [Phase 2 — Care network](CAREFLOW_PHASE_2_CARE_NETWORK.md) | Deferred |
| [Phase 3 — Safety & escalation](CAREFLOW_PHASE_3_SAFETY_ESCALATION.md) | Deferred |
| [Phase 4 — Communication](CAREFLOW_PHASE_4_COMMUNICATION.md) | Deferred |
| [Phase 5 — AI](CAREFLOW_PHASE_5_AI_INTELLIGENCE.md) | Deferred |

Design summary for UI work:

- High contrast, large type, and large tap targets for older adults
- Minimum tap size 56×56 px, with 16 px space between controls
- Shared tokens live in the client theme; do not invent one-off colors

---

## Team rules (short)

- Do not commit secrets, `.env` files, or database files.
- Keep commits small and limited to one area (API or client, not both unless required).
- Run tests before you push.
- Do not copy another teammate’s in-progress work or duplicate shared entities (`User`, `PatientProfile`, `Medication`, `CheckIn`).

Full process: [CONTRIBUTING.md](CONTRIBUTING.md).
