# DocTracker Improvement Roadmap

This document captures what is already improved, what is still pending, and the exact next actions to make the project production-ready.

## Current Status

### Completed in this chat

1. Doctor object-level authorization hardened
   - Doctors can now only update their own profile state (`status`, `eta`, `location`).
   - Admin can still update any doctor profile.
   - Updated files:
     - `backend/src/modules/doctors/doctor.controller.js`

2. Notification read authorization hardened
   - `PATCH /notifications/:id/read` now only marks notifications that belong to the requesting user (direct recipient or role target).
   - Updated files:
     - `backend/src/modules/notifications/notification.controller.js`

3. Queue check-in identity spoofing fixed
   - For patient role, backend now uses authenticated user id (`req.user.id`) instead of trusting client `patientId`.
   - Check-in route is restricted to `admin` and `patient`.
   - Updated files:
     - `backend/src/modules/queue/queue.controller.js`
     - `backend/src/modules/queue/queue.validation.js`
     - `backend/src/modules/queue/queue.routes.js`

4. Phase 1 security hardening implemented
   - Enforced strong JWT secret policy in production and reduced default access-token TTL.
   - Added global and auth-specific rate limiting.
   - Moved refresh token handling to `httpOnly` cookie with refresh-token rotation and logout cookie clearing.
   - Removed persistent token storage from frontend localStorage and added automatic refresh + retry flow in API client.
   - Updated files:
     - `backend/src/config/env.js`
     - `backend/src/app.js`
     - `backend/src/modules/auth/auth.controller.js`
     - `backend/src/modules/auth/auth.routes.js`
     - `backend/src/modules/auth/auth.validation.js`
     - `frontend/src/services/authService.js`
     - `frontend/src/services/apiClient.js`
     - `backend/package.json`

---

## Priority Plan (What You Still Need To Do)

## Phase 1: Critical Security (Do first)

### 1) Enforce strong JWT secret at startup
- **Problem:** Weak fallback JWT secret can allow token forgery if misconfigured in production.
- **Action:**
  - Remove insecure default in env config.
  - Throw startup error when `JWT_SECRET` is missing/weak in non-development environments.
- **Files:**
  - `backend/src/config/env.js`
- **Acceptance check:**
  - App fails to start when `JWT_SECRET` is missing in production mode.

### 2) Add auth rate limiting
- **Problem:** Login/register can be brute-forced.
- **Action:**
  - Add `express-rate-limit`.
  - Apply strict limiter on auth endpoints and a moderate global limiter.
- **Files:**
  - `backend/src/app.js`
  - `backend/src/modules/auth/auth.routes.js`
- **Acceptance check:**
  - Repeated requests return 429 with clear error message.

### 3) Secure token storage and refresh flow
- **Problem:** Access token in `localStorage` is vulnerable to XSS exfiltration.
- **Action:**
  - Move refresh token to `httpOnly`, `secure`, `sameSite` cookie.
  - Keep access token short-lived and rotate refresh token on refresh.
  - Add logout token invalidation (or revocation by token version/blacklist).
- **Files:**
  - `frontend/src/services/authService.js`
  - `frontend/src/services/apiClient.js`
  - `backend/src/modules/auth/auth.controller.js`
  - `backend/src/shared/utils/jwt.js`
- **Acceptance check:**
  - No refresh token in localStorage/sessionStorage.
  - Session persists via cookie and expires correctly.

---

## Phase 2: Data Integrity and Reliability

### 4) Add queue uniqueness/index constraints
- **Problem:** Duplicate active queue entries can occur under retries/concurrency.
- **Action:**
  - Add compound indexes and partial unique constraints where applicable.
  - Examples:
    - Unique token per doctor (and day/session if needed).
    - Prevent multiple active entries for same patient-doctor combination.
- **Files:**
  - `backend/src/modules/queue/queue.model.js`
- **Acceptance check:**
  - Duplicate active check-ins are rejected by DB constraints.

### 5) Harden queue/position access controls
- **Problem:** Current queue endpoints can expose more than needed by role.
- **Action:**
  - Ensure patients can only access their own queue position unless admin/doctor.
  - Restrict queue list visibility based on role policy.
- **Files:**
  - `backend/src/modules/queue/queue.routes.js`
  - `backend/src/modules/queue/queue.controller.js`
- **Acceptance check:**
  - Unauthorized role/path combinations return 403.

### 6) Add request logging and correlation ids
- **Problem:** Hard to trace issues across services and Socket events.
- **Action:**
  - Add request id middleware and structured logs (`pino` or `winston`).
- **Files:**
  - `backend/src/app.js`
  - `backend/src/server.js`
- **Acceptance check:**
  - Every API request has a request id in logs.

---

## Phase 3: Frontend and API Efficiency

### 7) Add `GET /doctors/me`
- **Problem:** Doctor dashboard fetches all doctors then filters client-side.
- **Action:**
  - Expose backend endpoint for current doctor profile.
  - Update dashboard to call only that endpoint.
- **Files:**
  - `backend/src/modules/doctors/doctor.routes.js`
  - `backend/src/modules/doctors/doctor.controller.js`
  - `frontend/src/components/DoctorDashboard.jsx`
- **Acceptance check:**
  - Doctor dashboard loads using one targeted profile query.

### 8) Centralize role-protected routes in frontend
- **Problem:** Route access checks are inconsistent and duplicated.
- **Action:**
  - Create reusable `ProtectedRoute` and `RoleProtectedRoute`.
  - Apply in `App.jsx` routing.
- **Files:**
  - `frontend/src/App.jsx`
  - Relevant dashboard components
- **Acceptance check:**
  - Wrong-role users are redirected before API calls.

### 9) Stop globally rendering admin tools
- **Problem:** Admin-oriented UI should not mount on every page.
- **Action:**
  - Mount `UserManager` only in admin routes/components.
- **Files:**
  - `frontend/src/App.jsx`
  - `frontend/src/components/UserManager.jsx`
- **Acceptance check:**
  - Non-admin sessions do not render admin management UI.

### 10) Use server-side pagination/filtering for users
- **Problem:** Client-side filtering does not scale.
- **Action:**
  - Pass `page`, `limit`, `role` to backend and consume paginated response.
- **Files:**
  - `frontend/src/services/userService.js`
  - `backend/src/modules/users/users.controller.js`
- **Acceptance check:**
  - User list API calls include pagination/filter query params.

---

## Phase 4: Developer Experience and Maintainability

### 11) Add test coverage baseline
- **Backend tests:**
  - Auth login/register
  - Doctor status update authorization
  - Queue check-in authorization
  - Notification ownership checks
- **Frontend tests:**
  - Route guards
  - Dashboard loading states
  - Auth token refresh behavior
- **Recommended tooling:**
  - Backend: Jest + Supertest
  - Frontend: Vitest + React Testing Library
- **Acceptance check:**
  - Meaningful tests pass in CI.

### 12) Add lint/format scripts and pre-commit hooks
- **Action:**
  - Ensure both frontend and backend have lint + format scripts.
  - Add `lint-staged` + `husky` for pre-commit checks.
- **Files:**
  - `backend/package.json`
  - `frontend/package.json`
- **Acceptance check:**
  - Commit is blocked on lint/test failures.

### 13) Add CI pipeline
- **Action:**
  - Add GitHub Actions workflow for install, lint, test, and build.
- **Files:**
  - `.github/workflows/ci.yml`
- **Acceptance check:**
  - PRs run automated checks and fail on regressions.

### 14) Fix env/documentation consistency
- **Action:**
  - Add real `backend/.env.example`.
  - Ensure `.env` is ignored in git and never committed.
  - Update readmes with clear backend/frontend run steps.
- **Files:**
  - `backend/.env.example`
  - `backend/.gitignore`
  - `backend/README.md`
  - `README.md`
- **Acceptance check:**
  - New developer can run app from docs without trial/error.

---

## Suggested Delivery Timeline

- **Week 1**
  - Phase 1 (Critical security)
  - Start Phase 2 item 4 (queue constraints)
- **Week 2**
  - Remaining Phase 2 + Phase 3
- **Week 3**
  - Phase 4 (tests, CI, docs hardening)

---

## Definition of Done (Project-Level)

The project is considered improved and stable when:
- No known authorization bypasses remain in doctor/queue/notification modules.
- Tokens are handled securely (cookie-based refresh, rotation, no sensitive token in localStorage).
- Auth endpoints are rate-limited.
- Queue integrity is protected by DB constraints.
- CI runs lint + tests + build on every PR.
- README and `.env.example` are accurate and complete.

