# Security Policy

## Overview
CareFlow Kin is committed to the highest standards of data security, patient privacy, and clinical dignity. As an independent living and connected care platform handling daily health adherence, wellness signals, and family circles, we adhere to strict healthcare information security standards, including alignment with HIPAA security rules and GDPR data protection principles.

---

## Supported Versions

Only the latest active major and minor releases receive security updates and patches.

| Version | Supported | Notes |
|---|---|---|
| `1.x.x` | :white_check_mark: Yes | Current production release line. Active maintenance. |
| `< 1.0.0` | :x: No | Pre-release development snapshots. Upgrade to v1.x immediately. |

---

## Reporting a Vulnerability

We value the contributions of security researchers and our community. If you discover a potential vulnerability, please report it promptly through our coordinated disclosure process.

### Disclosure Channels
- **Email**: Submit vulnerability reports to `security@careflowkin.org` (or directly via the project maintainers).
- **GitHub Private Vulnerability Reporting**: You may also report vulnerabilities securely through [GitHub Advisory Submissions](https://github.com/AshrafGalaxy/CareFlow_Kin/security/advisories/new).

### Information to Include in Your Report
To help us triage and resolve the issue quickly, please provide:
1. **Description**: A clear summary of the vulnerability, including severity assessment.
2. **Steps to Reproduce**: Detailed, step-by-step instructions or minimal proof-of-concept (PoC).
3. **Impact**: An objective assessment of affected components, data exposure, or privilege escalation vectors.
4. **Environment**: Client versions, operating system, browser, or API endpoints involved.

### Our Response Commitments (SLAs)
- **Initial Acknowledgment**: Within **24 hours** of submission receipt.
- **Triage & Assessment**: Within **72 hours**, confirming validity and assigned severity score (CVSS).
- **Remediation & Patching**:
  - **Critical**: Target patch release within **7 calendar days**.
  - **High**: Target patch release within **14 calendar days**.
  - **Medium / Low**: Next scheduled maintenance release.
- **Credit & Attribution**: With your permission, we will acknowledge your discovery in our security changelog and release notes.

---

## Architectural Security Principles

### 1. Server-Authoritative Access Control
Client-side view modifications do not constitute security boundaries. All tenant filtering, patient record queries, and mutation operations execute strict server-side role validation (`ELDER`, `FAMILY`, `DOCTOR`).

### 2. Sanctity of Consent
Access to senior health data by care circles (family guardians or clinicians) is governed by explicit, cryptographic patient consent. Data access tokens are scoped and revocable at any time.

### 3. Data Protection in Transit and at Rest
- **In Transit**: All API traffic and transport sockets mandate TLS 1.3 with modern, secure cipher suites. Unencrypted HTTP is prohibited.
- **At Rest**: Sensitive health records, emergency contacts, and authentication credentials are encrypted using AES-256 standard encryption.

### 4. Dignity Over Surveillance
CareFlow Kin strictly rejects continuous, intrusive camera or microphone monitoring. System data models are intentionally limited to discrete daily routine confirmations, medication intake timestamps, and voluntary wellness check-ins. No raw biometrics, telemetry, or user behavior are ever transferred to commercial third-party trackers or ad brokers.

---

## Safe Harbor

We consider security research conducted in accordance with this policy to be authorized, and we will not pursue legal action against researchers who:
- Make a good-faith effort to avoid privacy violations, data destruction, and service interruption.
- Give us reasonable time to remediate vulnerabilities before publicly disclosing any details.
- Avoid accessing, modifying, or retaining any data that does not belong to your test accounts.
