# DaddyBazaar — Multi-Tenant Business Website SaaS

A production-ready SaaS platform that lets local business owners register, configure a business profile, add products/services, choose a website template, and publish a professional website at `https://{slug}.daddybazaar.com`.

## Architecture

```
*.daddybazaar.com (Wildcard DNS)
         │
    Nginx / LB
         │
    ┌────┴────┐
    │         │
  React     Spring Boot
  SPA       REST API (:8080)
  (:5173)        │
              PostgreSQL
              Redis
              Object Storage (S3/MinIO/Local)
```

**Multi-tenancy**: Shared application + shared database with `business_id` row-level isolation. Tenant resolved from `Host` header via `TenantInterceptor → TenantContext`.

## Project Structure

```
dbadmin/
├── daddybazaar-backend/     ← Spring Boot 3.x (Java 21)
│   ├── src/main/java/com/daddybazaar/
│   │   ├── auth/            ← Registration, Login, JWT
│   │   ├── business/        ← Business profile + slug
│   │   ├── category/        ← Category CRUD
│   │   ├── product/         ← Product/Service CRUD
│   │   ├── website/         ← Templates, settings, public API
│   │   ├── subscription/    ← Plans, trial, billing
│   │   ├── tenant/          ← TenantContext, TenantResolver, TenantInterceptor
│   │   ├── security/        ← JWT, UserPrincipal
│   │   ├── config/          ← Security, CORS, Web MVC
│   │   └── common/          ← ApiResponse, exceptions, SlugUtils
│   └── src/main/resources/
│       ├── application.yml
│       └── db/migration/    ← Flyway V1-V14
│
├── daddybazaar-frontend/    ← React + Vite + Tailwind CSS
│   └── src/
│       ├── api/             ← Axios client + domain API modules
│       ├── context/         ← AuthContext
│       ├── features/        ← auth, dashboard, business, products, categories, website, subscription
│       ├── public-site/     ← PublicSiteRouter + Template1/2/3
│       └── routes/          ← ProtectedRoute
│
├── docker-compose.yml
├── .env.example
└── README.md
```

## Quick Start (Local Development)

### Prerequisites
- Java 21+
- Maven 3.9+
- Node.js 20+
- Docker Desktop

### Option A: Docker Compose (Recommended)

```bash
# Copy and edit environment variables
cp .env.example .env

# Start all services
docker compose up --build

# Access:
# Frontend: http://localhost:5173
# Backend:  http://localhost:8080
# API docs: http://localhost:8080/swagger-ui.html
```

### Option B: Manual

**1. Start PostgreSQL & Redis**
```bash
docker compose up postgres redis -d
```

**2. Backend**
```bash
cd daddybazaar-backend

# Copy env (or set environment variables directly)
# Edit src/main/resources/application.yml if needed

mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

**3. Frontend**
```bash
cd daddybazaar-frontend
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and fill in values. Never commit `.env`.

| Variable | Description | Default |
|---|---|---|
| `DB_URL` | PostgreSQL JDBC URL | `jdbc:postgresql://localhost:5432/daddybazaar` |
| `DB_USERNAME` | DB username | `daddybazaar` |
| `DB_PASSWORD` | DB password | `daddybazaar` |
| `JWT_SECRET` | 256-bit JWT signing secret | *(change in production!)* |
| `APP_DOMAIN` | Platform domain | `daddybazaar.com` |
| `STORAGE_PROVIDER` | `local` \| `s3` \| `r2` | `local` |

## API Documentation

After starting the backend, visit:
```
http://localhost:8080/swagger-ui.html
```

## Multi-Tenant Architecture

Every vendor gets a unique subdomain:
```
https://cakesquare.daddybazaar.com
```

The subdomain is resolved server-side from the HTTP `Host` header by `TenantInterceptor → TenantResolver → TenantContext`. All public API endpoints (`/api/v1/public/**`) determine the tenant from the hostname — the frontend never sends a `business_id` for public requests.

## Database Migrations

Flyway runs automatically on startup. Migrations are in:
```
daddybazaar-backend/src/main/resources/db/migration/
```

## Wildcard DNS (Production)

1. Create a wildcard DNS A record: `*.daddybazaar.com → your-server-ip`
2. Issue a wildcard TLS certificate: `*.daddybazaar.com` (via Let's Encrypt / Cloudflare)
3. Nginx terminates TLS and proxies to the React SPA + Spring Boot API

## Development Phases

| Phase | Status |
|---|---|
| Phase 1 — Project Setup | ✅ Complete |
| Phase 2 — Authentication | ✅ Complete (Auth + JWT + Registration flow) |
| Phase 3 — Business Profile | 🔄 Next |
| Phase 4 — Categories & Products | ⏳ |
| Phase 5 — Templates | ⏳ |
| Phase 6 — Public Website | ✅ Skeleton (PublicSiteRouter + Template 1) |
| Phase 7 — Dashboard Publish | ⏳ |
| Phase 8 — Subscriptions | ⏳ |
| Phase 9 — Admin | ⏳ |
| Phase 10 — Analytics | ⏳ |
| Phase 11 — Production | ⏳ |
