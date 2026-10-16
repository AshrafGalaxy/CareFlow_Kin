# Contributing

Follow this guide and [AGENTS.md](AGENTS.md) when you change this repository.

- Do not publish care data, tokens, or environment files.
- Coordinate with the team before you start work on a phase you do not own.

---

## 1. First-time setup

1. Clone the repository and follow the run steps in [README.md](README.md).
2. Enable the team git hooks (once per clone):

```bash
git config core.hooksPath .githooks
```

On Windows, Git Bash or Git for Windows is enough for these hooks. If a hook is not executable on macOS or Linux, run:

```bash
chmod +x .githooks/pre-commit .githooks/commit-msg .githooks/pre-push
```

3. Confirm you can:
   - start the API
   - start the client
   - sign in with the local demo elder account
   - pass `pytest` and `npm run typecheck`

---

## 2. How we work together

- Pull the latest `main` before you start.
- Work on a focused branch. Name it by domain, not by a file name. Examples: `feat/auth-refresh`, `fix/medication-adherence`.
- Do not overwrite another member’s assigned phase or unmerged work. Coordinate first.
- Keep shared entities canonical. Do not create a second `User`, `PatientProfile`, `Medication`, or `CheckIn` model.
- Client UI hiding is not security. Every permission check belongs on the backend.
- Do not ship fake success states, mock API data presented as real, or unfinished Phase 2–5 features.

Phase ownership is defined in the phase documents. Stay inside your assigned scope.

---

## 3. Commits

Hooks reject commits that break these rules. Write the subject first, then a short body.

### Subject line

- Imperative mood: `add`, `fix`, `update` (not `added` or `fixes`)
- Conventional type and scope: `feat(auth): add refresh token rotation`
- Aim for about 50 characters. **Hard limit: 70 characters**
- Allowed types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`

Do **not** put in the subject:

- Raw file names or extensions (`README.md`, `index.tsx`, `config.py`)
- The phrase `landing page` (use `public index`, `entry view`, or `public portal`)
- Private local scripts or untracked helper files

Good:

```
feat(auth): add token verification dependency
fix(api): reject cross-patient medication reads
docs(onboarding): clarify local setup steps
```

Bad:

```
update README.md and fix stuff
feat(client): redesign landing page
```

### Body

Use three short blocks:

1. **Context** — why the change is needed
2. **Modifications** — bullet list of what changed
3. **Verification** — commands you ran and the result

Example:

```
feat(checklist): persist skip reasons on daily items

Context:
Elders need a stored reason when a routine step is skipped
so the timeline and care circle see an accurate record.

Modifications:
- Add skip-reason field on checklist log writes
- Return the reason on today's checklist payload

Verification:
- pytest tests/ -v
- npm run typecheck (client)
```

### Cadence

- One logical domain per commit. Do not mix backend API work and unrelated client screens in a single commit.
- Commit when a subsystem is actually working and verified.
- Push to the remote after each completed milestone. Do not leave finished work only on your laptop.

---

## 4. What the git hooks check

| Hook | When | What it blocks |
| :--- | :--- | :--- |
| `pre-commit` | `git commit` | `.env` files, bytecode, leaked keys, invalid Python / TypeScript |
| `commit-msg` | `git commit` | Subject over 70 chars, missing conventional prefix, forbidden terms |
| `pre-push` | `git push` | Bad outgoing subjects, failed client typecheck, failed backend tests |

If a hook fails, fix the issue and make a **new** commit. Do not skip hooks.

---

## 5. Tests and CI

Run these locally before you push:

```bash
# backend
cd backend
pytest tests/ -v

# client
cd client
npm run typecheck
```

GitHub Actions runs the same checks on `main` (push and pull request).

A change is not done until the relevant tests or typecheck have actually been run. Do not commit unverified work.

---

## 6. Pull requests

Keep pull requests small and limited to one domain when possible.

In the description, include:

- Why the change exists
- What you changed (short bullets)
- Commands you ran and the outcome
- Any follow-up or out-of-scope item you did **not** implement

Avoid:

- The phrase `landing page`
- File names in the PR title (use a subsystem name: `client`, `api`, `auth`, `docs`)
- Secrets, screenshots of real patient data, or `.env` contents

---

## 7. Security and data

- Never commit `.env*`, keys, tokens, or database files.
- Filter queries by the authenticated user or patient. No cross-user data.
- Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md). Do not open a public issue for a security flaw.

---

## 8. Scope to leave alone (for now)

Do not implement these unless you own that phase and the team has agreed it is time:

- Care tokens, care circle internals, consent center (Phase 2)
- SOS, help requests, escalation (Phase 3)
- Live voice/video and voice messages (Phase 4)
- AI, OCR, risk scoring, chatbots (Phase 5)

A navigation placeholder is allowed. A fake completed workflow is not.

---

## 9. Quick checklist

Before you ask for review:

- [ ] Latest `main` is merged or rebased into your branch
- [ ] Change stays in the assigned phase and domain
- [ ] No duplicated shared entities
- [ ] No secrets or environment files
- [ ] Commit subjects follow the format and 70-character limit
- [ ] `pytest` and/or `npm run typecheck` passed locally
- [ ] Branch is pushed to the remote
