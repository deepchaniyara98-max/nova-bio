# NOVA BIO

Premium animated landing page for a fictional biotechnology research company. Built as a production-quality Next.js application with a reusable component architecture, interactive scientific visualization, and a cinematic scroll experience.

The site explores a single idea: **biology is becoming programmable**.

## Project Overview

NOVA BIO is a dark, editorial biotechnology website. It combines molecular network visualization, research storytelling, and precise motion design. The architecture follows the same patterns used in `insights-lighthouse-ui`: App Router, React Query, Zustand, a typed API client, shadcn/ui primitives, and shared base components.

## Features

- Full-viewport hero with an interactive molecular graph
- Smooth scrolling and scroll-triggered section reveals
- Hover-linked research visualizations
- Expanding capabilities accordion with scientific illustrations
- Animated impact counters
- Interactive discovery graph with node insights
- Contact inquiry flow via React Query mutations
- Custom desktop cursor states
- Reduced-motion and mobile performance fallbacks
- SEO metadata, Open Graph image, robots, and sitemap

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **TanStack React Query**
- **Zustand**
- **Framer Motion**
- **Lenis**
- **Canvas** molecular visualization
- **Radix UI** primitives

## Architecture

```text
app/                  routes, SEO, API handlers
api-client/           typed HTTP client (ky)
components/
  ui/                 shadcn primitives
  base/               reusable layout/typography/CTA
  landing/            section-level page composition
  MolecularVisualization/
  ParticleField/
  AnimatedText/
  SectionReveal/
hooks/                React Query + interaction hooks
lib/                  query keys, site config, science data
providers/            QueryClient + Tooltip
stores/               Zustand UI + visualization state
types/                shared domain types
```

Landing data is served through Next.js API routes (`/api/research`, `/api/capabilities`, `/api/stats`, `/api/visualization`, `/api/contact`) and consumed with React Query, matching the lighthouse client/hook pattern.

## Animation Approach

- **Page entrance:** blurred, staggered word reveals in the hero
- **Scroll:** Lenis smoothing on desktop; native scroll on mobile and reduced-motion
- **Section reveals:** Framer Motion viewport fades using transform/opacity only
- **Visualization:** `requestAnimationFrame` canvas network; mouse parallax; node hover insights
- **Hover:** magnetic CTAs, nav underlines, research-area visual palette shifts
- **Performance:** particle density drops on mobile, 3D-heavy effects are avoided, animations pause conceptually via `prefers-reduced-motion`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```