# Acme SaaS Monorepo

A production-ready Turborepo SaaS template

## Quickstart

- Install deps: `pnpm i`
- Start databases: `pnpm db:dev:up`
- Copy env: `cp .env.example .env`
- Migrate DB: `pnpm db:migrate`
- Seed DB: `pnpm db:seed`
- Dev: `pnpm dev`

Apps:
- Web (Next.js 14): http://localhost:3000
- API (NestJS): http://localhost:3001/api/health

## Multitenancy

- `.env`
  - `MULTITENANT=on|off`
  - `TENANT_RESOLUTION_STRATEGY=subdomain|path|header`
  - `DEFAULT_TENANT_ID=public`
- FE `apps/web/middleware.ts` sets `x-tenant-id` header based on strategy (subdomain by default). Skips when `MULTITENANT=off`.
- BE `TenantGuard` resolves tenant from request using shared `@acme/tenancy`. When `MULTITENANT=off`, uses `DEFAULT_TENANT_ID`.

## Routes

- Marketing: `web/app/(marketing)` → `/`, `/pricing`, `/blog`
- Auth: `web/app/(auth)/auth/*` → sign-in scaffolding
- Dashboard: `web/app/(dashboard)/app/*`
- Nav visibility is driven by role and feature flags (helpers in `@acme/rbac`, `@acme/feature-flags`).

## Feature Flags

- Prisma model `FeatureFlag (key, enabled, variant, tenantId)`
- SDK `@acme/feature-flags` exposes `isEnabled(key)` and `getVariant(key)`
- API `GET /api/flags/:key` is tenant-aware
- Seeded flags: `invoices.v2`, `analytics.beta`

Usage example (FE):
```ts
import { FeatureFlagClient } from '@acme/feature-flags'
const client = new FeatureFlagClient({ getFlag: async (k) => fetch(`/api/flags/${k}`).then(r=>r.json()) })
const enabled = await client.isEnabled('invoices.v2')
```

## RBAC & Orgs

- Models: `User`, `Organization`, `Membership(Role)`, `Tenant`, `Plan`, `Subscription`
- BE `RbacGuard` maps action→min role
- FE hooks to implement: `useRole()`, `usePermission(action)` can wrap `@acme/rbac` helpers

## Auth

- NextAuth route is scaffolded for email and passkeys. Session can include `tenantId`, `orgId`, `role`.
- Nest JWT strategy reads tenant claim.

## DX

- Husky + lint-staged: ESLint + Prettier + typecheck on changed
- Commitlint (conventional)
- Shared ESLint/Prettier/TS config from `@acme/config`
- Vitest for packages, Jest for Nest
- CI GitHub Actions: install/cache, lint, test, typecheck, build, prisma migrate (preview)
- Docker compose for Postgres 16 + Redis 7

## Env toggles

Central in `@acme/env` (`features` helpers):
- `BILLING_ENABLED`, `EMAIL_ENABLED`, `ANALYTICS_WRITE_KEY`, `INVITES_ENABLED`

Conditional init patterns:
- Nest modules can be conditionally registered by reading env in module factory
- Next components can check public env values

## Prisma

- `schema.prisma` includes Tenants, FeatureFlags, Orgs, Users, Plans, Subscriptions
- Seed script creates default data and example flags
- Scripts: `prisma:migrate`, `prisma:seed`, `prisma:deploy`

## Scripts

- Root: `dev`, `build`, `test`, `lint`, `typecheck`, `db:dev:up`, `db:migrate`, `db:seed`
- Web: `dev`, `build`, `start`, `typecheck`
- API: `dev`, `build`, `start:prod`, `prisma:*`

## Minimal Demo

- Visit `/` for marketing
- Visit `/app` for dashboard
- `/app/data/users` shows AG Grid with users from API
- API: `/api/health`, `/api/users` (JWT protected), `/api/flags/:key`
