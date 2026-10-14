# CAREFLOW — PHASE 4: Human-to-Human Communication Infrastructure

**Owner:** Member 4  
**Goal:** Real communication between authorized Care Circle members.  
**AI:** AI voice assistant, voice commands and AI speech processing belong to Phase 5.

## Scope
- Voice call lifecycle: initiate, ring, accept, reject, miss, cancel and end.
- Real video calls using WebRTC/signaling or a documented managed provider.
- Session authorization and secure lifecycle.
- Voice messages: record, upload, secure storage, playback, read state and deletion/retention policy.
- Communication history and timestamps.
- Incoming/missed call notifications using the shared notification service.
- Restrict calls/messages to eligible relationships and consent policy.
- Mobile call UI with microphone/camera permissions, permission-denied guidance, reconnection and end-call controls.
- Localization-ready labels and accessible controls.
- Provider abstraction and clear configuration documentation. No fake timer or simulated remote participant presented as a real call.

## Old hackathon CAREFlow features to reimplement
Care Team/profile concepts, authentication/RBAC, provider relationships, responsive/mobile UI, localization and notifications. Existing AI chat is separate from human-to-human communication.

## Suggested entities
`CommunicationSession` (caller, receiver, type, status, timestamps, provider session ID as needed) and `VoiceMessage` (sender, receiver, storage key, duration, status, timestamps). Reuse shared User, CareRelationship, Consent, Notification and Audit.

## Suggested endpoints
- `POST /api/v1/communications/calls`
- `POST /api/v1/communications/calls/{id}/accept`
- `POST /api/v1/communications/calls/{id}/reject`
- `POST /api/v1/communications/calls/{id}/cancel`
- `POST /api/v1/communications/calls/{id}/end`
- `GET /api/v1/communications/history`
- `POST|GET /api/v1/communications/voice-messages`
- `POST /api/v1/communications/voice-messages/{id}/read`
- `DELETE /api/v1/communications/voice-messages/{id}`

## Direct Antigravity prompt
Implement Phase 4 of the NEW CAREFLOW app from scratch. The old hackathon app is a feature reference only. Inspect Phase 1 auth/notification contracts, Phase 2 relationship/consent policy and Phase 3 safety/event contracts. Implement Expo-compatible real authorized voice/video calls using a documented provider (prefer LiveKit or a verified React Native-compatible WebRTC integration), plus secure voice messages, session lifecycle, notifications, history, storage, retention/deletion and mobile permission/error/reconnection states. Verify native-module requirements in an Expo development build; do not assume Expo Go supports every call feature. Reuse shared entities; do not duplicate them. Do not fake calls with timers. Do not implement AI voice assistant, speech-to-text intent actions, AI multilingual speech, AI summaries or pattern/risk intelligence; those belong to Phase 5. Add tests for permissions, state transitions, provider/storage failure and UI states. Document provider setup, run actual checks and produce the required final report and old/new mapping.

## Test cases
Authorized/unauthorized call initiation; call accept/reject/cancel/end transitions; duplicate provider callbacks; microphone/camera denial; provider outage without false connected state; accurate missed-call notifications/history; upload type/size validation; storage URL access control; consent revocation behavior; read/delete/retention; network loss/reconnection; localization/accessibility; no AI processing introduced.

## Definition of Done
Configured test users can make real calls and send voice messages; provider requirements are documented; authorization, storage and failure paths are tested.

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
