# DocTracker Backend

Backend API for the Doctor Arrival Tracking System using Express, MongoDB, JWT auth, and Socket.IO.

## Setup

1. Copy `.env.example` to `.env` and update values.
2. Install dependencies:
   - `npm install`
3. Run in development:
   - `npm run dev`

## API Base

- `http://localhost:5000/api`

## Core Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /users` (admin)
- `DELETE /users/:id` (admin)
- `GET /doctors`
- `GET /doctors/:id`
- `PATCH /doctors/:id/status`
- `PATCH /doctors/:id/eta`
- `GET /schedules`
- `POST /schedules` (admin)
- `PATCH /schedules/:id` (admin)
- `GET /queue/:doctorId`
- `GET /queue/:doctorId/position/:patientId`
- `POST /queue/checkin`
- `GET /notifications`
- `PATCH /notifications/:id/read`
- `POST /notifications/broadcast` (admin)
- `GET /patients/me/tracking`

## Socket.IO Events

- Server emits:
  - `socket:ready`
  - `doctor:updated`
  - `queue:updated`
  - `notification:new`
