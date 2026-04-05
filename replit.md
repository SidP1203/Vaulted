# Vaunt Web Solutions - Agency Portfolio Site

## Overview

This is the website for **Vaunt Web Solutions**, a web development agency. It's a single-page marketing/portfolio site that showcases the agency's services, past work (projects), pricing, and includes a contact form. The site is built as a full-stack TypeScript application with a React frontend and an Express backend connected to a PostgreSQL database.

Key features:
- Portfolio projects grid pulled from the database
- Contact form that saves messages to the database
- Smooth scroll navigation between page sections (Services, Work, Pricing, Contact)
- Animated UI using Framer Motion

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: `wouter` for lightweight client-side routing (single main page + 404 fallback)
- **State/Data Fetching**: TanStack React Query for server state management; hooks in `client/src/hooks/` wrap API calls
- **Styling**: Tailwind CSS with CSS custom properties for theming; "new-york" style shadcn/ui component library
- **Animations**: Framer Motion for scroll animations, hover effects, and page transitions
- **UI Components**: Full shadcn/ui component set lives in `client/src/components/ui/`
- **Fonts**: Space Grotesk (display/headings) and DM Sans (body) loaded from Google Fonts
- **Form Handling**: React Hook Form with Zod validation via `@hookform/resolvers`

The frontend is a single page (`Home.tsx`) with section-based layout. Navigation scrolls to sections using native `scrollIntoView`. The `Navbar` component becomes opaque on scroll.

### Backend Architecture

- **Server**: Express 5 (ESM), entry point at `server/index.ts`
- **Route Registration**: `server/routes.ts` registers all API endpoints, using route paths and input schemas from the shared `shared/routes.ts` contract
- **Storage Layer**: `server/storage.ts` provides a `DatabaseStorage` class implementing the `IStorage` interface. All DB access goes through this abstraction — this makes it easy to swap implementations.
- **Dev Server**: In development, Vite middleware is mounted on Express for HMR (`server/vite.ts`). In production, Express serves the pre-built static files from `dist/public`.
- **Build**: A custom `script/build.ts` runs Vite for the client and esbuild for the server, bundling selected server dependencies for faster cold starts.

### Shared Contract Layer

The `shared/` directory is the single source of truth for:
- **Database schema** (`shared/schema.ts`): Drizzle ORM table definitions + Zod schemas auto-generated with `drizzle-zod`
- **API routes** (`shared/routes.ts`): Defines route paths, HTTP methods, input schemas, and response schemas. Both the frontend hooks and backend route handlers import from here, keeping them in sync.

This pattern eliminates duplicated type definitions and ensures the frontend and backend always agree on API shape.

### Database

- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL via `DATABASE_URL` environment variable
- **Schema tables**:
  - `projects`: id, title, description, imageUrl, link, isFeatured
  - `messages`: id, name, email, message, createdAt
- **Migrations**: Drizzle Kit, output to `./migrations/`, run with `db:push`

### Authentication

No authentication system is currently implemented. The site is public-facing only.

## External Dependencies

### Required Environment Variables
- `DATABASE_URL` — PostgreSQL connection string (required at startup; both server and drizzle-kit will throw if missing)

### Key Third-Party Libraries

| Library | Purpose |
|---|---|
| `drizzle-orm` + `drizzle-kit` | Database ORM and migration tooling |
| `pg` (node-postgres) | PostgreSQL driver |
| `express` v5 | HTTP server |
| `@tanstack/react-query` | Client-side server state and caching |
| `framer-motion` | Animations and transitions |
| `wouter` | Lightweight React router |
| `react-hook-form` + `@hookform/resolvers` | Form state and validation |
| `zod` + `drizzle-zod` | Runtime validation, shared between client and server |
| `shadcn/ui` (Radix UI primitives) | Accessible UI component library |
| `tailwind-merge` + `clsx` | Conditional CSS class utilities |
| `lucide-react` | Icon set |
| `vite` | Frontend bundler and dev server |
| `esbuild` | Server bundler for production |
| `tsx` | TypeScript execution for development |

### Replit-Specific Plugins (Dev Only)
- `@replit/vite-plugin-runtime-error-modal` — Shows runtime errors in a modal overlay
- `@replit/vite-plugin-cartographer` — Replit code navigation
- `@replit/vite-plugin-dev-banner` — Replit dev environment banner

### External Services
- **Google Fonts** — Loads Space Grotesk and DM Sans at runtime via `<link>` tags in `index.html` and `index.css`
- No email provider, payment processor, or authentication service is currently wired up (though `nodemailer` and `stripe` appear in the build allowlist, suggesting future plans)