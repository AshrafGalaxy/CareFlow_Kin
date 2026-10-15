# Security Policy

## Overview
Careflow is built with an elder-first architecture focusing on patient privacy, server-side access control, and senior dignity. We take security and privacy seriously and welcome vulnerability reports directly from researchers and users.

---

## Supported Versions

Security fixes and updates are applied to the active `main` branch.

| Branch / Release | Supported | Notes |
|---|---|---|
| `main` (v1.x) | :white_check_mark: Yes | Actively maintained codebase. |
| Legacy branches | :x: No | Please pull the latest `main` branch. |

---

## Reporting a Vulnerability

If you find a security issue or vulnerability, please do not open a public issue. Use the private reporting channel on GitHub so we can fix it safely before it becomes public knowledge.

### How to Report
- **GitHub Private Vulnerability Report**: Go to [GitHub Security Advisory](https://github.com/AshrafGalaxy/CareFlow_Kin/security/advisories/new) and submit your report. This keeps your communication private between you and the repository maintainer.
- **Maintainer Profile**: You can also reach out through the GitHub maintainer profile at [github.com/AshrafGalaxy](https://github.com/AshrafGalaxy).

### What to Include
Please share as much detail as possible to help reproduce the issue:
1. Description of the vulnerability.
2. Steps to reproduce or proof-of-concept code.
3. Potential impact (e.g., unauthorized data access, privilege escalation).
4. Affected endpoints, routes, or files.

### Response & Fixes
The maintainer reviews private vulnerability advisories as promptly as possible, verifies the reported issue against the current code, and pushes verified patches directly to the `main` branch.

---

## Security Tenets in the Codebase

1. **Server-Authoritative Authorization**:
   The backend (FastAPI) checks user roles (`ELDER`, `FAMILY`, `DOCTOR`) and JWT tokens on every protected endpoint. Client-side route adjustments are never used as a security boundary.

2. **Scoped Database Queries**:
   Database queries explicitly filter records by patient and user identity to prevent cross-user data exposure.

3. **Password Hashing**:
   All user passwords are encrypted using `passlib` with `bcrypt` before storage in the database. Raw passwords are never logged or stored in plain text.

4. **Dignity Over Surveillance**:
   The application deliberately avoids continuous video or audio streaming. Health and adherence data is collected through discrete, voluntary user actions (confirming a checklist item, recording a dose, or sharing a mood check-in).

---

## Responsible Research (Safe Harbor)

If you conduct security research against this project in good faith:
- Avoid accessing or modifying data that does not belong to your test account.
- Avoid disrupting services or degrading system availability.
- Allow reasonable time to address the issue before sharing details publicly.
