# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### ClientVerse (`artifacts/clientverse`)
- **Type**: react-vite, static marketing site
- **Preview path**: `/`
- **Port**: 24718
- **Description**: ClientVerse operational consultancy marketing website
- **Pages**: Home (`/`), Services (`/services`), About (`/about`), Capabilities (`/features`), Pricing (`/pricing`), Contact (`/contact`)
- **Brand**: Dark navy `#0A1628`, teal accent `#4AC4E0`, Inter font, dark-only
- **Key components**: `src/components/navbar.tsx`, `src/components/footer.tsx`
- **No backend** — fully static frontend, no API routes

### API Server (`artifacts/api-server`)
- **Type**: Express API server
- **Preview path**: `/api`
- Currently only has the health check endpoint — not used by ClientVerse

## Migration Notes

The original project was imported from Vercel/v0 as a Next.js app called "ClientVerse".
The source code was not committed in the original repo (gitignored), only configs were in `.migration-backup/`.
The site was rebuilt from scratch using the detailed CHANGELOG_CLIENTVERSE.md as the specification.
Converted from Next.js static export to Vite + React with wouter routing.
