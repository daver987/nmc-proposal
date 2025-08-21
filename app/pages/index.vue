<script setup lang="ts"></script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Operational AI — Balanced Plan</h1>
        <p class="text-sm text-gray-500">Numbers-first narrative, quick wins, and adoption.</p>
      </div>
      <div class="flex gap-2">
        <UButton to="/roi" color="primary">ROI Calculator</UButton>
        <UButton to="/hopper" variant="outline">Opportunity Hopper</UButton>
        <UButton to="/kpi" variant="ghost">KPI Catalog</UButton>
        <UButton to="/talk" variant="ghost">Talk Track</UButton>
      </div>
    </div>

    <MetricCards />

    <UCard>
      <template #header> Objective </template>
      <p>
        In 45–60 days, deliver (a) a defensible map of NMC’s high‑impact AI opportunities across
        Ops/Finance/HR/IR/Legal, (b) two production‑grade quick wins with measured ROI, and (c) an
        adoption program for non‑technical users. Leverage ChatGPT Enterprise connectors + Deep
        Research. No rip‑and‑replace on Day 1.
      </p>
    </UCard>

    <div class="grid gap-4 md:grid-cols-3">
      <UCard>
        <template #header>Phase 1 — Discovery & Baseline (Weeks 1–2)</template>
        <ul class="list-disc pl-5 space-y-1">
          <li>Stakeholder map; capture candidate workflows with metrics sheets.</li>
          <li>Stand up connectors to reduce knowledge friction.</li>
          <li>Publish an Opportunity Hopper (scoring template).</li>
        </ul>
      </UCard>
      <UCard>
        <template #header>Phase 2 — Prioritize & Pilot (Weeks 3–6)</template>
        <ul class="list-disc pl-5 space-y-1">
          <li>Pick Top‑5 by RICE; launch 2 quick‑win pilots.</li>
          <li>Acceptance criteria per pilot (numeric pass/fail gates).</li>
          <li>Enablement: micro‑videos + job aids.</li>
        </ul>
      </UCard>
      <UCard>
        <template #header>Phase 3 — Scale & Govern (Weeks 7–9)</template>
        <ul class="list-disc pl-5 space-y-1">
          <li>Graduate pilots that hit gates; expand to next teams.</li>
          <li>Governance: permissions‑inherit, citations‑on, audit logs.</li>
          <li>Quarterly ROI roll‑up + roadmap.</li>
        </ul>
      </UCard>
    </div>

    <UCard>
      <template #header>Evaluation Method — Where AI Should Go</template>
      <ol class="list-decimal pl-5 space-y-1">
        <li>Inventory & shadow sessions; collect artifacts and SOPs.</li>
        <li>Measure baseline minutes/defects/cycle time; build metrics sheets.</li>
        <li>Quantify unit economics: volume, minutes, loaded rate, queue/defect.</li>
        <li>Score: Impact ($/mo), Effort, Risk, Confidence; compute RICE.</li>
        <li>Pilot with numeric acceptance criteria.</li>
        <li>Prove with A/B or pre/post; instrument results.</li>
      </ol>
    </UCard>

    <UCard>
      <template #header>Candidate Quick Wins (examples)</template>
      <ul class="list-disc pl-5 space-y-1">
        <li>Investor/LP reporting assist with citations in Office.</li>
        <li>Due‑diligence packet triage and checklist generation.</li>
        <li>Policy/FAQ assistant for Ops/HR/IT with escalation.</li>
        <li>Contract review aide (clause extraction & variance highlights).</li>
      </ul>
    </UCard>

    <UCard>
      <template #header>Acceptance Gates (per quick win)</template>
      <ul class="list-disc pl-5 space-y-1">
        <li>≥ X% reduction in minutes/task with 95% confidence (n≥30).</li>
        <li>Defect rate not worse than baseline (ideally improved).</li>
        <li>Adoption: target weekly active users within 14 days.</li>
        <li>Compliance: zero permission violations; citations on answers.</li>
      </ul>
    </UCard>

    <UCard>
      <template #header>Architecture Stance</template>
      <ul class="list-disc pl-5 space-y-1">
        <li>ChatGPT Enterprise connectors + Deep Research; MCP where needed.</li>
        <li>No custom vector DB in v1; revisit for narrow, high‑volume lanes.</li>
        <li>Security: SSO/SCIM; permission‑inherit; audit logs; PII rules.</li>
      </ul>
    </UCard>

    <UCard>
      <template #header>What You’ll See Weekly</template>
      <ul class="list-disc pl-5 space-y-1">
        <li>Updated Opportunity Hopper with scores and baselines.</li>
        <li>Pilot scorecards with pre/post numbers and go/no‑go.</li>
        <li>Adoption dashboard for target cohorts.</li>
      </ul>
    </UCard>
  </div>
</template>
