# Docker Compose Design (Dev + Prod)

## Context
Project has separate `frontend/` (React with `react-scripts`) and `backend/` (Django 5.2, GIS-enabled settings). User requested dockerization with two services for development and selected option to additionally prepare a production compose file.

## Goals
- Provide local development stack with `frontend` and `backend` services.
- Development backend should default to SQLite (no Postgres in dev compose).
- Prepare separate production compose that includes Postgres.

## Non-Goals
- Full production hardening and deployment automation.
- TLS, reverse-proxy, and orchestration-level tuning.

## Architecture
- `docker-compose.yml` (development):
  - `frontend`: Node container, `npm start`, hot reload via bind mount.
  - `backend`: Python container, Django dev server with auto reload, SQLite DB file in backend volume.
- `docker-compose.prod.yml` (production baseline):
  - `db`: Postgres service with healthcheck and named volume.
  - `backend`: Django production command (gunicorn), configured via env to use Postgres.
  - `frontend`: Production build served from nginx.

## Components
1. Compose files
- Create `docker-compose.yml` with dev-only services (`frontend`, `backend`).
- Create `docker-compose.prod.yml` with `frontend`, `backend`, `db`.

2. Dockerfiles
- Create `frontend/Dockerfile` with multi-stage support (dev deps + prod build/serve stages).
- Create `backend/Dockerfile` with Python runtime and environment settings.

3. Backend configuration
- Update `backend/backend/settings.py` to support DB selection by env:
  - `USE_SQLITE=True` -> SQLite in dev.
  - otherwise Postgres from env vars (`POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_PORT`).

4. Backend dependencies
- Introduce a docker-friendly requirements file for Linux container builds (avoid current local Windows wheel reference in `requirements.txt`).
- Add gunicorn for production service startup.

## Data Flow
- Dev:
  - Browser -> `frontend:3000` -> API calls to backend (`http://localhost:8000` in browser context).
  - Django persists data in SQLite file in mounted backend directory.
- Prod:
  - Browser -> `frontend` (nginx) -> API calls to backend endpoint.
  - Backend <-> Postgres (`db` service over Docker network).

## Error Handling
- Backend startup executes migrations before server start; failures keep container in failed state with visible logs.
- Prod DB healthcheck gates backend dependency to reduce startup race conditions.

## Testing Strategy
- Validate compose syntax:
  - `docker compose config`
  - `docker compose -f docker-compose.prod.yml config`
- Smoke tests:
  - Dev: `docker compose up --build`
  - Prod: `docker compose -f docker-compose.prod.yml up --build -d`
- Verify service reachability:
  - Frontend `http://localhost:3000`
  - Backend `http://localhost:8000`

## Risks and Mitigations
- GIS/PostGIS dependencies can complicate backend image builds.
  - Mitigation: keep dev DB on SQLite and avoid forcing GDAL wheel installation from Windows path.
- API base URL mismatch between browser and internal Docker network names.
  - Mitigation: use browser-reachable default (`localhost:8000`) and configurable env override.
