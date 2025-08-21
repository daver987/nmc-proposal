<script setup lang="ts">
// scripts
</script>

<template>
  <div class="space-y-8">
    <div class="grid items-center gap-6 md:grid-cols-2">
      <div class="space-y-3">
        <h1 class="text-3xl md:text-4xl font-semibold leading-tight">
          Operational AI Audit & Activation
        </h1>
        <p class="text-base text-toned">Proposal for New Mountain Capital</p>
      </div>
    </div>

    <UCard>
      <template #header><span class="text-lg font-medium">Objective</span></template>
      <div class="text-sm space-y-2">
        <p>In 45–60 days, deliver:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>
            Defensible map of high‑impact AI opportunities across Ops / Finance / HR / IR / Legal.
          </li>
          <li>Two production‑grade quick wins with measured ROI.</li>
          <li>Adoption program for non‑technical users.</li>
        </ul>
        <p>
          Leverage ChatGPT Enterprise connectors + Deep Research and, where needed, MCP tools. No
          rip‑and‑replace on Day 1.
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header
        ><span class="text-lg font-medium">How I Determine Where AI Should Go</span></template
      >
      <ol class="list-decimal pl-5 space-y-1 text-sm">
        <li>
          <span class="font-medium">Inventory & Shadow —</span> 8–12 stakeholder interviews + 4–6
          process shadow sessions per function. Artifacts: SOPs, checklists, report templates,
          email/Teams snippets.
        </li>
        <li>
          <span class="font-medium">Measure the baseline —</span> time‑on‑task sampling pull simple
          operational logs where available (SharePoint/Drive activity, email volume, report revision
          counts). Create a metrics sheet for each candidate workflow.
        </li>
        <li>
          <span class="font-medium">Quantify the unit economics —</span> for each workflow:
          volume/week, avg minutes/task, loaded labor rate, defect/rework rate, cycle time, queue
          time, blocker count.
        </li>
        <li>
          <span class="font-medium">Score opportunities —</span> Impact ($/mo) = hours saved ×
          loaded rate + error cost avoidance + cycle‑time value. Effort = data readiness +
          integration + change. Risk = compliance + reputational + model failure impact. Confidence
          = quality of baseline. Compute RICE = Reach×Impact×Confidence / Effort.
        </li>
        <li>
          <span class="font-medium">Pilot with acceptance criteria —</span> one‑pager per pilot:
          well‑formed input, expected output, guardrails, and numeric pass/fail gates.
        </li>
        <li>
          <span class="font-medium">Prove with numbers —</span> A/B or pre/post with matched samples
          instrumentation baked into the workflow (minutes saved, error rate, rework).
        </li>
      </ol>
    </UCard>

    <UCard>
      <template #header><span class="text-lg font-medium">Phase Plan</span></template>
      <div class="grid gap-4 md:grid-cols-3">
        <div>
          <p class="text-sm font-medium mb-1">Phase 1 — Discovery & Baseline (Weeks 1–2)</p>
          <ul class="list-disc pl-5 space-y-1 text-sm">
            <li>Stakeholder map: Ops, Finance/Accounting, IR/LP, Legal/Compliance, HR, IT.</li>
            <li>Capture 20–30 candidate workflows metrics sheet per workflow.</li>
            <li>
              Stand up ChatGPT Enterprise connectors (SharePoint/OneDrive/Drive/Outlook/Teams) to
              remove knowledge friction.
            </li>
            <li>Publish a living Opportunity Hopper (scoring template attached).</li>
          </ul>
        </div>
        <div>
          <p class="text-sm font-medium mb-1">Phase 2 — Prioritize & Pilot (Weeks 3–6)</p>
          <ul class="list-disc pl-5 space-y-1 text-sm">
            <li>Pick Top‑5 by RICE launch 2 quick‑win pilots.</li>
            <li>Acceptance criteria per pilot (see below).</li>
            <li>Enablement for end‑users: 6× 60‑sec micro‑videos + one‑page job aids.</li>
          </ul>
        </div>
        <div>
          <p class="text-sm font-medium mb-1">Phase 3 — Scale & Govern (Weeks 7–9)</p>
          <ul class="list-disc pl-5 space-y-1 text-sm">
            <li>Graduate pilots that hit gates expand to next 2–3 teams.</li>
            <li>Governance: permissions‑inherit, citations‑on, audit logging, usage analytics.</li>
            <li>Quarterly ROI roll‑up + next‑tranche roadmap.</li>
          </ul>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header
        ><span class="text-lg font-medium">Candidate Quick Wins (examples)</span></template
      >
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li>
          Investor/LP reporting assist — assemble inputs, draft commentary with citations inside
          Word/Excel via ChatGPT for Teams.
        </li>
        <li>
          Due diligence packet triage — classify, extract key fields, generate a closing checklist
          and gap list.
        </li>
        <li>
          Policy/FAQ assistant — internal Teams bot for common Ops/HR/IT questions answers carry
          citations unresolved → human.
        </li>
        <li>
          Contract review aide — clause extraction & variance highlights for NDAs/MSAs attorney
          review remains mandatory.
        </li>
      </ul>
    </UCard>

    <UCard>
      <template #header
        ><span class="text-lg font-medium">KPIs & Acceptance Criteria</span></template
      >
      <div class="text-sm">
        <p>
          We don’t guess targets before we measure. Definitions and gates below baselines come from
          Phase‑1 sampling.
        </p>
        <div class="mt-4 grid gap-8 md:grid-cols-2">
          <div class="space-y-4">
            <div>
              <p class="font-medium">Cross‑workflow</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>Minutes per task (avg, p50, p90).</li>
                <li>Cycle time (start→finish) & queue time (waiting).</li>
                <li>Defect rate (% needing rework) first‑pass yield.</li>
                <li>Throughput (tasks/week/person).</li>
                <li>Adoption (weekly active users and tasks/user).</li>
              </ul>
            </div>
            <div>
              <p class="font-medium">Retrieval/Knowledge</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  Task success rate: user finds the correct doc/answer with citation within SLA.
                </li>
                <li>Time‑to‑answer (seconds).</li>
                <li>Escalation rate to human.</li>
              </ul>
            </div>
            <div>
              <p class="font-medium">LP Reporting</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>Prep minutes/report revision cycles.</li>
                <li>Comment accuracy (PM review pass rate).</li>
                <li>Deadline hit rate.</li>
              </ul>
            </div>
            <div>
              <p class="font-medium">Due Diligence</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>Docs triaged/hour checklist completeness.</li>
                <li>Missed items found in QC.</li>
              </ul>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <p class="font-medium">Acceptance gates for a quick win</p>
              <ul class="list-disc pl-5 space-y-1">
                <li>
                  ≥ X% reduction in minutes per task (set after baseline) with 95% confidence
                  (paired t‑test over ≥30 samples).
                </li>
                <li>Defect rate not worse than baseline ideally improved by Y%.</li>
                <li>
                  Adoption: ≥ N weekly active users in target cohort within 14 days of launch.
                </li>
                <li>Compliance: zero permission violations all AI answers carry citations.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <div class="grid gap-6 md:grid-cols-3">
      <UCard>
        <template #header
          ><span class="text-lg font-medium">Change Enablement Non‑Technical Users</span></template
        >
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>
            Role‑based job aids (one page each) and six 60‑sec micro‑videos embedded in Teams.
          </li>
          <li>Office‑hours (20 minutes weekly) and a champions network in each function.</li>
          <li>“Pinned replies” library so trainers paste the right guidance mid‑meeting.</li>
        </ul>
      </UCard>

      <UCard>
        <template #header><span class="text-lg font-medium">Architecture Stance</span></template>
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>
            ChatGPT Enterprise connectors + Deep Research for knowledge work MCP tools where needed.
          </li>
          <li>
            No custom vector DB in v1 consider later only for narrow, high‑volume lanes that demand
            it.
          </li>
          <li>Security: SSO/SCIM permission‑inherit audit logs PII handling rules.</li>
        </ul>
      </UCard>

      <UCard>
        <template #header><span class="text-lg font-medium">What You’ll See Weekly</span></template>
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>Updated Opportunity Hopper with scores and baselines.</li>
          <li>Pilot scorecards with pre/post numbers and a go/no‑go call.</li>
          <li>Adoption dashboard for the target cohorts.</li>
        </ul>
      </UCard>
    </div>
    <section class="text-center py-8">
      <div class="space-y-6">
        <h2 class="text-2xl font-bold">Explore the Tools</h2>
        <p class="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Use the interactive calculators and templates to understand the impact and approach
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <UButton to="/roi" size="lg" variant="outline">ROI Calculator</UButton>
          <UButton to="/hopper" size="lg" variant="outline">Opportunity Hopper</UButton>
          <UButton to="/kpi" size="lg" variant="outline">KPI Catalog</UButton>
        </div>
      </div>
    </section>
  </div>
</template>
