# NMC Proposal

### Prompt for the coding agent (Nuxt 4 interactive proposal)

You are a senior Vue/Nuxt engineer. Build a **password-protected Nuxt 3 app** that turns my attached HTML/text/CSV assets into a **clickable, numbers-first interactive proposal** for New Mountain Capital. It must be simple, fast, and convincing for a PE operations leader. No fluff.

#### Tech stack

- **Nuxt 3** (SSR off by default is fine)
- **@nuxt/ui** (Nuxt UI) for components; Tailwind enabled
- **Pinia** for light state
- **Papa Parse** for CSV import/export
- **Chart.js** via `vue-chart-3` for tiny charts (bar/line only)
- **Shields**: ESLint + TypeScript
- No server DB; local state only. No external calls.

#### App goals (what Michael needs to see)

1. **How I determine where AI should go** across Ops/Finance/IR/Legal/HR (evaluation method first, not tool-first).
2. **Measurable KPIs and ROI math** (baselines first, then pass/fail gates).
3. **Two likely quick wins** shown as _examples_, not promises (LP reporting assist; due-diligence triage).
4. **Buy-in engine** for non-technical users (micro-videos, job aids, champions).
5. **Boring, low-politics architecture**: ChatGPT Enterprise connectors + Deep Research (+ MCP where needed). No custom RAG v1.

#### Pages & behavior

Create these routes with polished, PE-friendly UI:

1. `/` — **Overview**
   - Render the core narrative from `NMC_Balanced_OnePager.html` as clean sections.
   - Sticky metric cards (empty until user enters baselines elsewhere).
   - CTA buttons to `/roi`, `/hopper`, `/kpi`, `/talk`.

2. `/kpi` — **KPI Catalog**
   - Parse `NMC_KPI_Catalog.html` into a structured table with checkboxes to mark KPIs “in scope”.
   - Button: **Export selected KPIs** to CSV.
   - Button: **Print/Save as PDF** (use a print stylesheet).

3. `/roi` — **ROI Calculator**
   - Convert the model in `NMC_ROI_Calculator.html` into a reactive form with these fields:
     `minutesSavedPerTask, tasksPerMonth, loadedRatePerHour, baselineDefects, postDefects, dollarsPerDefect, cycleDaysSaved, dollarsPerDay, monthlyCost`.
   - Live outputs: **Labor savings (\$/mo)**, **Error avoidance (\$/mo)**, **Cycle-time value (\$/mo)**, **Net ROI (\$/mo)**.
   - Small bar chart that updates with the three components and Net ROI.
   - **Save scenario** (name + current inputs) to Pinia; list scenarios; allow export/import JSON.

4. `/hopper` — **Opportunity Hopper**
   - Upload and parse `NMC_Opportunity_Scoring_Template.csv`.
   - Editable grid with columns:
     `Area,Workflow,Volume/week,Avg minutes/task,Loaded $/hr,Defect rate %,Cycle time (days),Queue time (days),Data readiness (1-5),Integration complexity (1-5),Change impact (1-5),Risk (1-5),Confidence (0-100%),Impact $/mo,Effort score,RICE score,Notes`.
   - Compute derived values as user types:
     - **Impact \$/mo** = `(Avg minutes/task ÷ 60) * (Volume/week * 4.33) * (Loaded $/hr)` + `(ΔDefects/month * $/defect)` + `(Cycle days saved * $/day)`; leave Δ and \$/defect/\$/day override fields per row.
     - **Effort score** = normalized combination of Data readiness + Integration complexity + Change impact (sum).
     - **RICE** = `Reach×Impact×Confidence / Effort` where Reach = `Volume/week * 4.33`.

   - Sorting by RICE; chips for **Top-5**; **Export CSV** with computed columns.

5. `/talk` — **Talk Track**
   - Render `NMC_Redo_Talk_Track.txt` as 5 copyable bullets with “Copy” buttons.
   - Section with **email snippet** (I’ll paste it); include a “Copy” button.

6. `/demo` — **90-sec Video**
   - Simple player. I’ll supply a URL at runtime.
   - Under the player show the 4 beats (retrieval example, eval harness idea, DD triage, LP assist). Keep it generic; **no promises**.

#### Password protection

- Create **route middleware** `password.global.ts` that checks for a cookie `nmc_access=ok`.
- If missing, redirect to `/enter`.
- `/enter` shows a single passcode field. On submit, compare to `NUXT_PUBLIC_PASSCODE`. If match, set `nmc_access=ok` (httpOnly false is fine here) and forward.
- Support optional `?next=`.

#### Components (implement)

- `components/MetricCards.vue` — four KPIs (default blank) fed from Pinia (updated when ROI or Hopper has values).
- `components/ROICalc.vue` — full ROI form + mini bar chart (Chart.js).
- `components/HopperTable.vue` — editable table with computed columns + CSV import/export (Papa Parse).
- `components/CopyLine.vue` — bullet with copy button.
- `components/AppHeader.vue` / `AppFooter.vue`.

#### Styling

- Use **Nuxt UI** defaults; conservative palette, readable at 125% scaling.
- Tables sticky headers, zebra rows, clear numeric alignment.
- Print styles for `/kpi` and `/hopper` export.

#### Content ingestion

- Place my provided HTML files under `/assets/source/`.
- Import with Vite `?raw` where needed and **render safely** (sanitize basic tags) into Nuxt components.
- For the CSV template, pre-seed `/hopper` with its rows if no upload provided.

#### Runtime config

- `NUXT_PUBLIC_PASSCODE` (string)
- `NUXT_PUBLIC_DEMO_VIDEO_URL` (string; used on `/demo`)

#### Navigation

Top nav: **Overview, KPI Catalog, ROI Calculator, Opportunity Hopper, Talk Track, Demo** (locked behind passcode).

#### Deliverables

1. A working Nuxt 4 repo with:
   - `package.json` including: `nuxt`, `@nuxt/ui`, `@pinia/nuxt`, `vue-chart-3`, `chart.js`, `papaparse`, `zod` (for simple numeric validation).
   - `nuxt.config.ts` with Tailwind, Nuxt UI, Pinia, runtimeConfig for passcode/video.
   - `middleware/password.global.ts`, `pages/enter.vue` implemented.
   - All pages/components above, fully wired.

2. Seed data: load `NMC_Opportunity_Scoring_Template.csv` into Hopper on first visit (until the user uploads a fresh CSV).
3. Basic unit tests for **ROI math** and **RICE calculation** (Vitest) covering at least: zero/negative inputs, rounding, and CSV import/export fidelity.
4. A `README.md` with:
   - Setup/run commands
   - How to set the passcode env
   - How to deploy to Vercel/Netlify
   - Where to paste the 90-sec video URL
   - How to update the KPI list and scoring weights

#### Acceptance criteria

- App builds and runs locally with `NUXT_PUBLIC_PASSCODE=letmein`.
- Entering the passcode grants access for the session; refresh persists via cookie.
- `/roi` changes instantly update metric cards on `/` (via Pinia).
- `/hopper` computes **Impact \$/mo**, **Effort score**, and **RICE** live as the user edits; sorting and CSV export work.
- `/kpi` selection exports only chosen KPIs to CSV and prints cleanly.
- No vague targets are hard-coded. Only **formulas and measured outputs**.
- Mobile and desktop layouts look clean; all inputs labeled for accessibility.

#### Nice to have (if cheap)

- Save/Load **Hopper** table to/from localStorage.
- Button on `/` to **Download Proposal PDF** (print the overview + current metric cards).
- Tiny toasts for “Copied”, “Saved”, etc.

Generate the full codebase (files + contents). Keep copy neutral and professional; no vendor bashing. Use the wording from the supplied HTML/text where possible. Output the repo tree and then the file contents.
