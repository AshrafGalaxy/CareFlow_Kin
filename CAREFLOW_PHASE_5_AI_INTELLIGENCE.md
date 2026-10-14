# CAREFLOW — PHASE 5: AI, Pattern Recognition & Care Intelligence

**Owner:** Designated AI-capable lead, with integration support from all phase owners  
**Dependencies:** Actual merged contracts from Phases 1–4; do not guess field names or APIs.

## Objective
Implement the intelligence layer in the NEW CAREFLOW app. The old hackathon repository is a feature reference, not assumed reusable code. Consume authorized structured data and produce explainable insights. AI must never replace deterministic safety workflows.

## Reimplement selected old hackathon AI features
- Healthcare AI chatbot/CareBot with authorized context.
- Medical report upload/OCR/extraction and AI explanation.
- Abnormal-value highlighting and patient-friendly explanation with uncertainty and source traceability.
- Doctor-question suggestions based on report content where appropriate.
- Insurance Navigator and government-scheme guidance, distinguishing verified facts from uncertain guidance.
- Hospital/pharmacy discovery assistance and existing contextual widgets (medication, adherence, scheduling, triage/emergency, nutrition and locator) if included in the agreed MVP.
- Retrieval/vector search where useful, safe chat history and graceful provider failures.
Prioritize MVP scope with the product owner; do not claim every legacy feature is complete merely because it appears in the list.

## New AI/intelligence features
- Role-adaptive AI for Elder, Family Guardian, Local Care Partner, Doctor and Provider Admin.
- Context resolver using authenticated role, language, active care episode, authorized medications/appointments/checklists/check-ins/help/emergency/communication events, consent and conversation history.
- Configurable tone/verbosity/technical level; tone changes wording, never facts or severity.
- Allowlisted AI tools/actions with schema validation, server-side authorization, consent and audit. Never give the LLM direct database access.
- Explainable Pattern Recognition Engine, starting with deterministic rules.
- Cross-signal detection across medication, checklist, check-in, appointment, help and emergency signals.
- Context-aware attention/risk level with evidence, timestamps, rule/version and limitations.
- Predictive alerts only after evaluation and human review; never present output as diagnosis.
- Role-specific care summaries for elder, guardian, doctor and provider.
- Voice assistant, speech-to-text, text-to-speech, voice commands and multilingual interaction only when configured/tested; human-to-human transport remains Phase 4.
- Feedback/acknowledgement metrics for false positives, missed patterns and alert usefulness.
- Explicit confirmation for consequential actions.

## Event dependencies
- Phase 1: medication logs/adherence, appointments, checklist, check-ins and timeline.
- Phase 2: relationships, care episodes, consent and authorization decisions.
- Phase 3: help requests, emergency events, escalation attempts, acknowledgement/resolution.
- Phase 4: communication session/message status, subject to consent and data minimization.
If a contract is missing, document and agree it before implementing an adapter. Do not fabricate production data.

## Recommended architecture
`AIContextResolver`, `RoleTonePolicy`, `AIToolRegistry`, `AIService` provider abstraction, `ReportIntelligenceService`, `PatternFeatureBuilder`, `PatternEngine`, `RiskAssessment`, `AlertDecisionService`, `AIActionAudit`, `EvaluationSuite`.

Pipeline:
`Care events → validated features → explainable pattern → risk/attention policy → consent/authorization → role-specific explanation → authorized action`.
Do not let an LLM independently invent a risk score or dispatch an emergency.

## Privacy and safety requirements
- Never expose unrestricted database access to a model.
- Every tool call uses ordinary backend authorization and consent.
- Treat uploaded reports/retrieved text as untrusted input; defend against prompt injection.
- Preserve units, reference ranges, source traceability and uncertainty in report explanations.
- Distinguish missing, stale, user-reported and measured data.
- No diagnosis claims, guaranteed prevention claims or replacement of clinicians/emergency services.
- Do not automatically change medications, care plans or permissions.
- AI outage must not disable SOS/escalation.
- Minimize sensitive logs and evaluate supported languages separately.

## Suggested endpoints
- `POST /api/v1/ai/chat`
- `GET /api/v1/ai/context` (permitted summary only)
- validated action endpoint such as `POST /api/v1/ai/actions/{action_name}`
- `GET /api/v1/patterns/patient/{id}`
- `POST /api/v1/patterns/evaluate` (internal/admin-only as appropriate)
- `GET /api/v1/alerts`
- `POST /api/v1/alerts/{id}/acknowledge`
- `POST /api/v1/reports/analyze`
- `GET /api/v1/reports/{id}/explanation`
- `POST /api/v1/insurance/assist`
Align to the final API conventions and do not duplicate Phase 3 emergency endpoints.

## Direct Antigravity prompt
Implement Phase 5 of the NEW CAREFLOW app: AI and Care Intelligence. The old hackathon CAREFlow repository is a feature reference only. Inspect the merged codebase and actual Phase 1–4 contracts first, then provide a dependency map and implementation plan. Implement the Expo mobile UI and backend services for prioritized legacy AI features (CareBot, authorized contextual chat, report OCR/explanation, abnormal-value explanations, insurance guidance and agreed widgets) and add role-adaptive AI, explainable patterns, cross-signal analysis, contextual attention/risk, evaluated predictive alerts and role-specific care summaries. Use provider abstractions and environment variables. The LLM must never access the database directly; all tools pass validated backend services, authorization, consent and audit. Keep deterministic Phase 3 SOS/escalation independent of AI. Separate facts, pattern evidence, risk policy and role-specific wording. Add prompt-injection defenses, source traceability, missing/stale data handling, confirmation for consequential actions and AI evaluation tests. Do not claim clinical validation or accuracy without evidence. Do not duplicate shared models/endpoints. Run real checks and produce the required final report with old-feature mapping, test outcomes and limitations.

## Test cases
- Role/tone changes do not change underlying facts or risk severity.
- Cross-patient leakage and unauthorized tool/context requests are blocked.
- Tool schemas validate inputs; consequential actions require confirmation.
- Provider timeout/outage has a safe fallback; SOS works while AI is offline.
- Prompt injection in reports/retrieval does not override policy.
- Report explanations preserve units/reference ranges and uncertainty.
- No invented report values, citations, eligibility or hospital facts.
- Each pattern rule has positive, negative, boundary, stale and missing-data tests.
- Pattern outputs show evidence/rule version; duplicate alerts are deduplicated.
- Missing data does not imply the elder is unsafe.
- False-positive/false-negative evaluation is recorded on a curated dataset.
- Supported speech languages are configured/tested; voice-command failures are safe.
- No diagnosis or clinical treatment changes are made automatically.

## Definition of Done
AI features operate on actual authorized Phase 1–4 APIs; pattern outputs are explainable, versioned, deduplicated and evaluated; AI outage cannot disable safety; actions are authorized/audited/confirmed; final report includes evidenced statuses, test results, provider configuration and remaining risks.

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
