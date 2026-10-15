# Agent Directives and Operational Protocols

## 1. Professional and Academic Demeanor
- **Tone**: Maintain an analytical, formal, and academic tone in all communications, technical documentation, and code reviews.
- **Rigor**: Base architectural and algorithmic decisions on established software engineering principles and empirical verification. Avoid informal language or unsubstantiated claims.
- **Clarity**: State assumptions directly and concisely in a structured, point-wise format.

## 2. Version Control and Commit Standards
- **Subject Line**:
  - Target ~50 characters; maximum ceiling of 72 characters.
  - Imperative mood (e.g., `feat(auth): implement token verification dependency`).
  - Standardized conventional types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`.
- **Commit Body Format**:
  - **Context**: State the theoretical rationale and purpose of the update.
  - **Modifications**: Provide an itemized, point-wise enumeration of code alterations.
  - **Verification**: Document the executed test suite commands, compiler outputs, and observed metrics.
- **Domain Segregation and Cadence**:
  - Maintain strictly segregated commits per logical domain (e.g., isolate backend services from frontend views).
  - Stacking bulk modifications across disparate directories (e.g., bundling 15–20 mixed files) is prohibited.
  - Commit at regular intervals immediately upon achieving verifiable completion of each subsystem.
- **Canonical Scope Isolation**:
  - Commit messages, titles, and descriptions must strictly refer to tracked, repository-level assets.
  - Never mention, document, or cite private local scripts, untracked helper files, or developer-specific local tooling in version control messages.
- **Remote Synchronization (Mandatory Push Protocol)**:
  - Immediately push verified local commits to the upstream remote repository (`git push origin <branch>`) upon completing each logical domain milestone.
  - Never allow local commits to accumulate unpushed, ensuring the remote repository reflects the authoritative state of development at all times.

## 3. Engineering Tenets
- **Git Hygiene and .gitignore Integrity**: Rigorously maintain `.gitignore`. Never allow untracked files, virtual environments, build outputs, or environment files into version control.
- **Modern Architectural Standards**: Employ current industry architectural patterns, including asynchronous REST APIs, strongly typed data contracts, and responsive layout primitives.
- **Strict Core Scoping**: Focus solely on delivering the core platform foundation thoroughly. Future extensions (circle tokens, SOS escalation, live media streaming, machine learning logic) are strictly deferred.
- **Server-Authoritative Security**: Client-side interface adjustments do not constitute access control. All role checks and consent validations must execute on the backend.
- **Single Source of Truth**: Unified entities (`User`, `PatientProfile`, `Medication`, `CheckIn`) must remain canonical and un-duplicated across the system.
- **Authentic Workflows**: Simulated timeouts or cosmetic mock responses presented as completed services are prohibited.
- **Universal Responsiveness**: Ensure user interface parity across mobile, tablet, desktop, and presentation deck display viewports.
- **Ergonomics and Visual Excellence**: Enforce modern, premium visual standards, generous touch boundaries, fluid multi-screen responsiveness, and clean multi-sensory feedback.

## 4. Anti-Patterns and Repeating Errors to Avoid
- **Unverified Versioning**: Committing modifications without executing the relevant test suite or compiler checks.
- **Ambiguous Commit Headers**: Emitting non-standard or overly brief subject lines devoid of scope.
- **Direct Client Mocking**: Rendering fabricated data in place of integrating with defined REST contracts.
- **Credential Leakage**: Committing secret keys, tokens, or environment definitions into the repository tree.
- **Ignored Git Hygiene**: Leaving `.gitignore` outdated when introducing new dependencies or runtime artifacts.
- **Scope Intrusion**: Prematurely introducing code for future modules into the foundational layer.
- **Bulk Commit Stacking**: Stacking multi-domain alterations across disparate subsystems into an indistinct single commit.
- **Cross-User Data Bleed**: Executing database queries lacking explicit tenant or user ownership filters.
- **Inadequate Interface Contrast**: Employing low-contrast color combinations or undersized tap targets unsuitable for older adults.
- **Local Artifact Disclosure**: Referencing uncommitted, private, or developer-specific local files within commit messages, pull requests, or repository-facing documentation.
- **Unpushed Commit Stagnation**: Accumulating completed commits locally without synchronizing and pushing them upstream to the remote repository.
