# CAREFLOW — PHASE 3: Safety, Help Requests, SOS & Escalation

**Owner:** Member 3  
**Goal:** Implement dependable, auditable safety workflows.  
**AI:** Safety decisions/escalation must be deterministic; Phase 5 AI cannot be a single point of failure.

## Scope
- Help requests and assistance categories: `MEDICAL`, `TRANSPORT`, `MEDICATION`, `SHOPPING`, `HOUSEHOLD`, `FAMILY_CONTACT`, `OTHER`, `EMERGENCY`.
- Help statuses: `CREATED`, `NOTIFIED`, `ACCEPTED`, `IN_PROGRESS`, `COMPLETED`, `DECLINED`, `ESCALATED`, `CANCELLED`.
- SOS initiation, confirmation/cancellation policy and duplicate-request protection.
- `EmergencyEvent` lifecycle and acknowledgement/resolution.
- Deterministic escalation rules: urgency, recipients, response deadlines, fallback order and retries.
- Notify multiple guardians; continue according to policy until an acknowledgement/response or authorized resolution.
- Escalate to local partners and configured doctor/provider/emergency contact pathways.
- Notification delivery states, retries, idempotency and failure visibility.
- Timeline/audit trail for every critical state transition.
- Optional location with explicit permission and transparent usage.
- Honest UI states: attempted, delivered only if confirmed, accepted, escalated, cancelled and resolved.
- Do not imply this app replaces emergency services.

## Old hackathon CAREFlow features to reimplement
Emergency/triage widget concepts, notifications/push/scheduler requirements, authentication/RBAC, doctor/provider relationships, audit trail, and hospital locator/map as a supporting discovery tool. Reimplement behavior in the new app.

## Suggested entities
`HelpRequest`, `EmergencyEvent`, `EscalationAttempt`; reuse shared `Notification`, `CareRelationship`, `Consent` and `AuditEvent`. Example HelpRequest fields: patient_id, category, description, priority, status, created_by, assigned_to, created_at, accepted_at, resolved_at. Validate all state transitions.

## Suggested endpoints
- `POST|GET /api/v1/help-requests`
- `GET /api/v1/help-requests/{id}`
- `POST /api/v1/help-requests/{id}/accept`
- `POST /api/v1/help-requests/{id}/decline`
- `POST /api/v1/help-requests/{id}/complete`
- `POST /api/v1/help-requests/{id}/cancel`
- `POST /api/v1/sos`
- `GET /api/v1/emergency-events`
- `GET /api/v1/emergency-events/{id}`
- `POST /api/v1/emergency-events/{id}/acknowledge`
- `POST /api/v1/emergency-events/{id}/resolve`
- `GET /api/v1/escalations/{id}`

## Direct Antigravity prompt
Implement Phase 3 of the NEW CAREFLOW app from scratch. The old hackathon app is a requirements reference only. Inspect Phase 1's shared identity/notification/audit contracts and Phase 2's relationship/consent contracts before coding. Implement Expo mobile flows and backend services for HelpRequest, SOS, EmergencyEvent, deterministic Escalation Engine, recipient selection, acknowledgement, retries, cancellation/resolution, notification tracking and audit trail. Every action must check identity, relationship, consent and scope through shared services. Prevent duplicate SOS, invalid transitions and cross-patient access. Emergency/escalation logic must not rely on an LLM. Do not build a mock-only workflow or report delivery without provider confirmation. Do not implement calls/video/voice messages (Phase 4) or AI patterns/risk/prediction (Phase 5). Add migrations and tests for failure/concurrency cases, document external provider setup, run actual checks and provide the required final report.

## Test cases
Invalid categories/fields; unauthorized create/accept/decline/complete/cancel; impossible/stale transitions; SOS creates an auditable event; multiple guardian notifications and nonresponse fallback; decline/timeouts/retries/provider failure; duplicate SOS idempotency; concurrent accept/decline; revoked consent; optional location privacy; no false delivery claim; audit transitions; safety works with AI offline; end-to-end elder → SOS/help → guardian/partner → acknowledgement → resolution.

## Definition of Done
End-to-end safety workflows are deterministic, permission-checked, auditable and failure-aware; timeouts/retries/cancellation/escalation policy is documented; no production dispatch claims without verified integration.

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
