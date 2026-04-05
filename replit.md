# Vaulted Web Solutions - Agency Portfolio Site

## Overview

This is the website for **Vaulted Web Solutions**, a web development agency. It's a single-page marketing/portfolio site modeled closely after Squarespace's homepage design — full-bleed hero with cycling photo slides, Squarespace-style tab sections, horizontal scrollable card carousels, and animated interactive demos.

Key features:
- Full-viewport cycling hero (3 auto-rotating background photos, slide indicators)
- "Sites built by Vaulted" — horizontally scrollable browser-window mockup cards
- Animated stat counters (count-up on scroll)
- "What we build" — 4-tab section (Business / E-Commerce / Non-Profits / Portfolios) with image + description
- "Everything included" — dark background horizontally scrollable feature card carousel
- "Built to move" — 4 live interactive animation demos (3D tilt, text reveal, scroll counter, parallax)
- "How we work" — 6-step numbered process grid
- Pricing section with feature checklist
- Featured project callout (CSEL Cincinnati)
- Contact form that saves messages to the database
- Navbar: transparent + white text over hero, opaque + dark on scroll

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: `wouter` for lightweight client-side routing (single main page + 404 fallback)
- **State/Data Fetching**: TanStack React Query for server state; hooks in `client/src/hooks/`
- **Styling**: Tailwind CSS with CSS custom properties for theming; "new-york" style shadcn/ui
- **Animations**: Framer Motion — scroll parallax, hover effects, stagger reveals, spring physics
- **UI Components**: Full shadcn/ui component set in `client/src/components/ui/`
- **Fonts**: Space Grotesk (display/headings) and DM Sans (body) via Google Fonts
- **Form Handling**: React Hook Form with Zod validation

The frontend is a single page (`Home.tsx`) with all sections inline. Navbar (`Navbar.tsx`) adapts between transparent/white-text (hero) and opaque/dark-text (scrolled).

### Backend Architecture

- **Server**: Express 5 (ESM), entry point at `server/index.ts`
- **Route Registration**: `server/routes.ts` registers all API endpoints
- **Storage Layer**: `server/storage.ts` provides `DatabaseStorage` implementing `IStorage`
- **Dev Server**: Vite middleware mounted on Express for HMR. Production: Express serves static build.

### Shared Contract Layer

The `shared/` directory is the single source of truth:
- **Database schema** (`shared/schema.ts`): Drizzle ORM + Zod schemas
- **API routes** (`shared/routes.ts`): Route paths, methods, input/output schemas

### Database

- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL via `DATABASE_URL` environment variable
- **Tables**:
  - `projects`: id, title, description, imageUrl, link, isFeatured
  - `messages`: id, name, email, message, createdAt

### Authentication

No authentication. Public-facing marketing site.

## Key Files

| File | Purpose |
|---|---|
| `client/src/pages/Home.tsx` | Main page — all sections, animation demos, tab logic |
| `client/src/components/Navbar.tsx` | Dynamic navbar (transparent hero → opaque scroll) |
| `client/src/components/ContactForm.tsx` | Contact form with validation |
| `client/src/index.css` | Global styles, CSS vars, scrollbar-hide utility |
| `server/routes.ts` | API routes (GET /api/projects, POST /api/messages) |
| `server/storage.ts` | Database CRUD operations |
| `shared/schema.ts` | Drizzle schema + Zod types |

## External Dependencies

### Required Environment Variables
- `DATABASE_URL` — PostgreSQL connection string

### Key Third-Party Libraries

| Library | Purpose |
|---|---|
| `drizzle-orm` + `drizzle-kit` | Database ORM and migration tooling |
| `pg` (node-postgres) | PostgreSQL driver |
| `express` v5 | HTTP server |
| `@tanstack/react-query` | Client-side server state |
| `framer-motion` | All animations (springs, parallax, scroll triggers) |
| `wouter` | Lightweight React router |
| `react-hook-form` + `@hookform/resolvers` | Form state and validation |
| `zod` + `drizzle-zod` | Runtime validation |
| `shadcn/ui` (Radix UI) | Accessible UI components |
| `lucide-react` | Icons |
| `vite` | Frontend bundler |
