# CAREFLOW — PHASE 1: Core Platform & Elder Experience

**Owner:** Member 1  
**Goal:** Establish the new app's shared foundation and implement the elder's daily-care experience.  
**AI:** Excluded; Phase 5.

## Scope
- New-project structure, local setup, environment configuration, code quality commands and contribution conventions.
- Coordinate shared architecture: roles, auth/session contract, database/migrations, API error format, audit conventions and design system.
- Role-aware navigation and server-side authorization foundations. UI hiding alone is not security.
- Elder-friendly home/dashboard with large, calm, accessible actions.
- Daily checklist with complete/skip, timestamps and history.
- Daily wellness check-in (`GOOD`, `OKAY`, `NOT_WELL`, `NEEDS_HELP`); not a diagnosis.
- Medication management, schedule, instructions, taken/missed/skipped/deferred logs, adherence summary and reminders.
- Appointments and follow-ups.
- Elder profile/settings, language preference and notification preferences.
- Timeline foundation for medication, appointments, check-ins and other permitted events.
- Family/Care Circle shortcut and “I Need Help” entry point that integrate with Phases 2 and 3 contracts; do not create duplicate relationship/help systems.

## Old hackathon CAREFlow features to reimplement
Authentication/role foundations, patient dashboard/profile/settings, medication CRUD/logging/adherence/reminders, appointments/follow-ups, timeline, notification preferences/in-app notification foundation, responsive navigation/localization, and available-data analytics. The old code is a reference, not assumed reusable.

## Suggested entities and API contracts
Agree final names with the team; don't duplicate shared models:
- Shared `User` and patient/profile design
- `Medication`, `MedicationLog`
- `Appointment`, `FollowUp`
- `DailyChecklistItem`, `ChecklistLog`
- `DailyCheckIn`
- `TimelineEvent` or documented timeline projection
- Shared `Notification`, `NotificationPreference`

Suggested endpoints:
- `GET /api/v1/elder/home`
- `GET|POST /api/v1/medications`
- `PATCH /api/v1/medications/{id}`
- `POST /api/v1/medications/{id}/logs`
- `GET /api/v1/medications/adherence`
- `GET|POST /api/v1/appointments`
- `GET /api/v1/checklist/today`
- `POST /api/v1/checklist/{id}/complete`
- `POST /api/v1/checklist/{id}/skip`
- `POST /api/v1/checkins`
- `GET /api/v1/checkins/history`
- `GET /api/v1/timeline`

## Direct Antigravity prompt
Implement Phase 1 of CAREFLOW, a NEW mobile-first connected-care app built from scratch. The old hackathon CAREFlow repository is a feature reference only; do not assume its code or database will be reused. Inspect the new project and shared team contracts first, then state assumptions and a plan. Establish the Expo + React Native + TypeScript app foundation (Expo Router, typed API client, environment configuration and app scripts), role/auth contract, accessible mobile app shell, and elder daily-care flows: home, checklist, check-in, medication management/logging/adherence/reminders, appointments/follow-ups, profile/settings and timeline. Coordinate shared models and API conventions; do not duplicate User, Patient, CareRelationship, Notification or Audit entities. Add migrations, validation, server-side authorization, error/loading/empty states, accessibility and tests. Do not implement Care Token/Care Circle internals (Phase 2), HelpRequest/SOS/escalation (Phase 3), calls/video/voice messages (Phase 4), or AI/pattern/risk logic (Phase 5). A future-module navigation entry is allowed, but do not fake a completed workflow. Run available Expo/TypeScript checks (for example typecheck, lint, Jest/React Native Testing Library and an Expo export/build where configured), backend checks, and produce the required final report with old-feature mapping and evidenced statuses.

## Test cases
- Valid/invalid authentication and role authorization.
- Cross-patient access is rejected.
- Medication create/edit/log validation and correct adherence calculations.
- Reminder scheduler handles timezone policy and failures.
- Checklist complete/skip persists and cannot modify another patient's items.
- Check-in validation/history and access control.
- Appointment date/time validation and permissions.
- Timeline ordering and privacy.
- UI loading/empty/error/offline states.
- Clean database migration and secret scanning.

## Definition of Done
New project setup is documented; elder core flows work end-to-end; shared contracts are reviewed; real test/build outcomes are reported; old-to-new feature mapping and gaps are included.

## Shared instructions for every phase

### Project context
CAREFLOW is a NEW mobile-first elder-care and connected-care application built from scratch. The old hackathon CAREFlow repository is a feature/requirements reference only; do not assume its code, database, APIs, authentication or UI will be reused.

### Agreed technology stack
- **Mobile app:** Expo + React Native + TypeScript, using Expo Router for navigation.
- **Backend API:** Python + FastAPI; REST endpoints documented through OpenAPI/Swagger.
- **Database:** PostgreSQL with SQLAlchemy and Alembic migrations.
- **Authentication/security:** JWT access/refresh-token strategy or the agreed secure session approach; secure token storage on mobile; server-side RBAC plus relationship/consent checks. Never rely on hiding UI controls for authorization.
- **API state and requests:** TanStack Query with `fetch` or Axios; use one shared API client and typed request/response contracts.
- **Push notifications:** Expo Notifications with the configured Expo Push Service / FCM / APNs path. Do not assume push delivery without provider confirmation.
- **Files:** S3-compatible object storage for medical reports and voice messages; never store large/private files as public URLs.
- **Background work:** start with a documented scheduler if appropriate; use a queue such as Redis + Celery only when required by the workload.
- **Calls/media:** LiveKit or a documented WebRTC/provider integration for Phase 4.
- **AI/search (Phase 5 only):** provider abstraction for LLMs, OCR service, and PostgreSQL + pgvector if retrieval is needed.
- **Testing:** Jest + React Native Testing Library for the Expo app; Pytest for FastAPI; API/integration tests for permissions, workflows and failure states.
- **Delivery:** Git/GitHub; backend and managed PostgreSQL deployment; EAS Build for installable mobile builds.

Treat this as the agreed default stack unless the existing new-project repository contains a documented, explicit decision that the team has already approved. Do not introduce Flutter or Dart. Do not add a separate Next.js portal unless the team explicitly decides that a doctor/provider/admin web portal is in scope; the primary client is the Expo mobile app.

Target roles: Elder, Family Guardian, Local Care Partner, Doctor, Hospital/Provider Admin.

### Non-negotiable engineering rules
1. Inspect the new project before editing; report assumptions and a plan.
2. Agree shared user/role, database, API, notification, consent and audit contracts before parallel implementation.
3. Do not duplicate shared entities such as User, Patient, CareRelationship, Notification or Audit.
4. Build real workflows, not decorative UI or fake success states. Isolate external providers behind documented interfaces.
5. Add migrations, validation, server-side authorization, error/loading/empty states and automated tests.
6. Use environment variables for secrets; never commit keys or tokens.
7. Build the mobile UI with Expo + React Native + TypeScript and Expo Router. Use large accessible controls, readable text, localization-ready strings and clear confirmations. Keep shared API contracts typed and never put secrets in the app bundle.
8. Do not overwrite other members' work. Document ownership, dependencies and integration steps.
9. Run actual formatter, linter, type checker, tests and build when available. Report actual results only.
10. Old repository features are requirements to reimplement, not proof that the new app contains them.
11. Phases 1–4 must not implement AI/intelligence logic. Phase 5 owns AI. Phase 1 may include only a future AI entry point, not AI decision logic.

### Required final report
Include delivered features; files changed; models/migrations; API contracts; frontend routes/components; authorization/privacy decisions; tests and actual results; known limitations/configuration; old hackathon feature → new implementation status (`implemented`, `partial`, `not implemented`, `not verified`); new feature status; integration dependencies and manual verification steps.
