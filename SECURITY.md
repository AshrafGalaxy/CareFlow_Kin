# Security Policy

Patient privacy, server-side access control, and elder dignity are mandatory. Do not discuss vulnerabilities in public issues, group chat, or pull request threads.

---

## Supported versions

Security fixes go to the active `main` branch.

| Branch | Supported | Notes |
| :--- | :--- | :--- |
| `main` | Yes | Current codebase |
| Older branches | No | Rebase or merge onto latest `main` |

---

## How to report a problem

Do **not** open a public GitHub issue for a security flaw.

1. Use a [private GitHub security advisory](https://github.com/AshrafGalaxy/CareFlow_Kin/security/advisories/new), or message the maintainer directly.
2. Include:
   - what is wrong
   - how to reproduce it on a local or test account
   - likely impact (data leak, privilege bypass, and so on)
   - affected API routes or screens
3. Do not access or change data that is not yours.

The maintainer verifies the issue against current code and ships a fix on `main`.

---

## Rules already expected in the code

1. **Server-side authorization**  
   FastAPI checks JWT tokens and roles on protected endpoints. Hiding a button in the client is not access control.

2. **Scoped queries**  
   Database reads and writes must filter by the authenticated user or patient. Cross-user data is a defect.

3. **Password storage**  
   Passwords are hashed with bcrypt. Never log or store raw passwords.

4. **No secrets in git**  
   `.env` files, keys, and tokens stay off the repository. See [CONTRIBUTING.md](CONTRIBUTING.md).

5. **Dignity over surveillance**  
   Do not add always-on camera or microphone capture. Health data should come from clear, voluntary actions (a check-in, a dose log, a checklist step).

---

## Safe local testing

- Use the local demo account or accounts you created yourself.
- Do not load real patient records onto a personal machine.
- Do not run destructive tests against a shared production database.
