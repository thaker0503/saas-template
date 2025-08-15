# API App

Endpoints:
- `GET /api/health`
- `POST /api/auth/dev` → returns JWT (dev only)
- `GET /api/users` → protected with JWT + tenant header
- `GET /api/flags/:key` → tenant-aware