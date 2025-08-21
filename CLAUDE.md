# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a password-protected Nuxt 4 interactive proposal application for New Mountain Capital (NMC). The app features KPI tracking, ROI calculations, opportunity scoring, and data visualization components built with Vue 3, TypeScript, and Nuxt UI.

## Development Commands

- Install dependencies: `pnpm install` (Node 18+ recommended)
- Start development server: `pnpm dev` (runs on http://localhost:3000)
- Build for production: `pnpm build`
- Preview production build: `pnpm preview`
- Generate static files: `pnpm generate`
- Format code: `pnpm format` (runs Prettier)

## Architecture & Tech Stack

### Core Stack

- **Nuxt 4** with SSR and TypeScript
- **Vue 3** with `<script setup>` composition API
- **Nuxt UI 3** for components with Tailwind CSS
- **Chart.js** via `vue-chart-3` for data visualization
- **Papa Parse** for CSV import/export functionality
- **VueUse** utilities (especially `@vueuse/core`)

### Key Dependencies

- `@nuxt/image` for optimized image handling
- `papaparse` for CSV processing in HopperTable component
- `vue-chart-3` + `chart.js` for ROI visualization
- `@vueuse/core` for reactive utilities like `useStorage`

### Application Structure

- **Pages**: `/` (overview), `/roi` (calculator), `/hopper` (opportunity scoring), `/kpi` (catalog), `/talk` (talk track), `/demo` (video), `/enter` (password gate)
- **Components**: Modular Vue components in `app/components/`
- **Middleware**: Global password protection via `password.global.ts`
- **State Management**: Uses VueUse `useStorage` for persistent client-side state (no Pinia currently)

## Key Components

### HopperTable.vue

- Editable data table for opportunity scoring with computed RICE scores
- CSV import/export functionality using Papa Parse
- Real-time calculations for Impact $/mo, Effort score, and RICE score
- Data persisted via `useStorage` to localStorage

### ROICalc.vue

- Interactive ROI calculator with live Chart.js bar chart
- Computes Labor savings, Error avoidance, Cycle-time value, and Net ROI
- Reactive inputs with immediate visual feedback
- Uses VueUse `useStorage` for state persistence

### MetricCards.vue

- Displays key metrics pulled from ROI and Hopper calculations
- Updates reactively when underlying data changes

## Security & Environment

### Password Protection

- Global middleware checks for `nmc_access=ok` cookie
- `/enter` page validates against `NUXT_PUBLIC_PASSCODE` env var
- All routes except `/enter` are protected when passcode is configured

### Environment Variables

- `NUXT_PUBLIC_PASSCODE`: Required for app access
- `NUXT_PUBLIC_DEMO_VIDEO_URL`: Demo video URL for `/demo` page

## Styling & UI Conventions

### Theme Configuration

- Primary color: `amber` (gold accent)
- Neutral color: `zinc`
- Configured in `app/app.config.ts`

### CSS Structure

- Global styles in `app/assets/css/main.css`
- Imports Tailwind CSS and Nuxt UI base styles
- Components use Nuxt UI component library with Tailwind utilities

### Table Styling

- Sticky headers for long tables
- Right-aligned numeric columns with `text-right` classes
- Zebra striping and clear visual hierarchy

## Data Flow & State

### Storage Strategy

- Uses VueUse `useStorage` for client-side persistence
- Key storage items:
  - `roi-inputs`: ROI calculator state
  - `hopper-rows`: Opportunity table data
  - No server-side database or external API calls

### Reactive Computations

- ROI calculations update automatically when inputs change
- RICE scores recalculate on table edits
- Chart data updates reactively with computed values

## File Organization

- `app/pages/`: Route components (kebab-case filenames)
- `app/components/`: Reusable Vue components (PascalCase)
- `app/composables/`: Custom composition functions (use\* prefix)
- `app/middleware/`: Route middleware (global password protection)
- `docs/`: Internal documentation and planning files
- `public/reference/`: Static reference files (CSV templates, etc.)

## Important Notes

- Keep components focused and avoid manual DOM manipulation
- Use VueUse utilities for reactive patterns
- Follow existing TypeScript patterns and type safety
- Maintain accessibility with proper labeling and semantic HTML
- CSV exports should include computed columns from table calculations
