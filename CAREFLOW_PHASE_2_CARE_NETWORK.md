# CAREFLOW — PHASE 2: Care Network, Care Circle & Consent

**Owner:** Member 2  
**Goal:** Connect elders with authorized family guardians, local care partners, doctors and providers.  
**AI:** Excluded; Phase 5.

## Scope
- Secure Care Token creation, QR representation, expiry, activation and revocation.
- Care Episode lifecycle: pending, active, completed, cancelled.
- `CareRelationship` connecting elder, guardian, partner, doctor and provider.
- Multiple guardians and multiple local care partners.
- Care Circle management and role-specific views.
- Local Care Partner profile/status and assignment relationships.
- Consent center with granular access to categories of health information/actions; grant, update, revoke and expiry.
- Shared server-side authorization helpers consumed by other phases.
- Audit relationship, token and consent changes.
- Onboarding must not reveal patient data until identity/token/permission checks pass.

## Old hackathon CAREFlow features to reimplement
Authentication/RBAC integration, patient Care Team concepts, doctor/provider relationships, patient profile integration and audit conventions. Do not assume old models or endpoints exist.

## Suggested shared entities
`CareRelationship`, `CareToken`, `CareEpisode`, `ConsentGrant`/`Consent`, plus references to shared User/Patient/Provider and shared audit service. Agree foreign keys and naming with Phase 1 before migrations. Store a secure token representation; don't expose raw long-lived secrets.

## Suggested endpoints
- `POST /api/v1/care-tokens`
- `POST /api/v1/care-tokens/activate`
- `GET /api/v1/care-tokens/{id}`
- `POST /api/v1/care-tokens/{id}/revoke`
- `POST /api/v1/care-episodes`
- `GET /api/v1/care-episodes/{id}`
- `PATCH /api/v1/care-episodes/{id}`
- `POST /api/v1/care-circle/guardians`
- `POST /api/v1/care-circle/partners`
- `GET /api/v1/care-circle`
- `PATCH /api/v1/care-relationships/{id}`
- `DELETE /api/v1/care-relationships/{id}` (deactivate/revoke if history must remain)
- `GET|POST /api/v1/consents`
- `PATCH /api/v1/consents/{id}`
- `POST /api/v1/consents/{id}/revoke`

## Security requirements
Expired/revoked/invalid/reused tokens fail; activation attempts are rate-limited where supported; QR contains no clinical details; every sensitive read/action checks identity, relationship and consent; revocation takes effect on subsequent requests; guardians cannot self-grant access; partners see only assigned minimum-necessary data; prevent insecure direct object references; UI checks never replace backend authorization.

## Direct Antigravity prompt
Implement Phase 2 of the NEW CAREFLOW project from scratch. Treat the old hackathon app as a requirements reference only. Inspect Phase 1's shared identity/auth/database/API contracts before coding and report conflicts before changing files. Build the Expo mobile flows and backend APIs for Care Token + QR onboarding, Care Episode lifecycle, CareRelationship, multiple guardians, local partners, Care Circle and granular consent. Reuse shared User/Patient and audit services; do not duplicate them. Add migrations, validation, expiry/revocation, rate limiting where supported, privacy-safe UI and tests. Do not implement help requests/SOS/escalation (Phase 3), communication media/calls/messages (Phase 4), or AI/pattern/risk logic (Phase 5). Do not fake persistence or token activation. Produce the required final report with old-feature mapping, tests and limitations.

## Test cases
Valid, expired, revoked, malformed and reused token; rate limiting; no sensitive data in QR; multiple guardian/partner relationships; no guardian access before relationship/consent; consent category enforcement and revocation; partner minimum-necessary access; doctor/provider scope; cross-patient ID manipulation rejection; audit records; clean migration and accurate UI states.

## Definition of Done
Token → activation → Care Episode/relationship → consent → authorized Care Circle access works end-to-end; access tests pass; contracts for Phases 3–5 are documented.

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
