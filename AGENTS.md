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

## 3. Engineering Tenets
- **Server-Authoritative Security**: Client-side interface adjustments do not constitute access control. All role checks and consent validations must execute on the backend.
- **Single Source of Truth**: Unified entities (`User`, `PatientProfile`, `Medication`, `CheckIn`) must remain canonical and un-duplicated across the system.
- **Authentic Workflows**: Simulated timeouts or cosmetic mock responses presented as completed services are prohibited.
- **Universal Responsiveness**: Ensure user interface parity across mobile, tablet, desktop, and presentation deck display viewports.
- **Elder Ergonomics**: Enforce WCAG 2.1 AAA contrast guidelines (minimum 7:1 for normal text, 4.5:1 for large elements), 56px minimum touch boundaries, and clear multi-sensory feedback.

## 4. Anti-Patterns and Repeating Errors to Avoid
- **Unverified Versioning**: Committing modifications without executing the relevant test suite or compiler checks.
- **Ambiguous Commit Headers**: Emitting non-standard or overly brief subject lines devoid of scope.
- **Direct Client Mocking**: Rendering fabricated data in place of integrating with defined REST contracts.
- **Credential Leakage**: Committing secret keys, tokens, or environment definitions into the repository tree.
- **Cross-User Data Bleed**: Executing database queries lacking explicit tenant or user ownership filters.
- **Inadequate Interface Contrast**: Employing low-contrast color combinations or undersized tap targets unsuitable for older adults.
