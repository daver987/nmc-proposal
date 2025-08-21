<script setup lang="ts">
type Metrics = { labor?: number; error?: number; cycle?: number; net?: number }
const metrics = useState<Metrics>('metrics', () => ({}))
const hasMetrics = computed(() =>
  Boolean(
    (metrics.value.labor || 0) +
      (metrics.value.error || 0) +
      (metrics.value.cycle || 0) +
      (metrics.value.net || 0)
  )
)

const heroSrc = '/index-image.png' // place image in /public/index-image.png to display
const showHero = ref(true)
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
      <div v-if="showHero" class="hidden md:block">
        <img
          :src="heroSrc"
          alt="Proposal overview"
          class="w-full rounded-xl border border-default"
          @error="showHero = false"
        />
      </div>
    </div>

    <MetricCards v-if="hasMetrics" />
    <USeparator />

    <UCard>
      <template #header>
        <span class="text-lg font-medium">Objective</span>
      </template>
      <p class="text-sm">
        In 45–60 days, deliver (1) a prioritized map of high‑impact AI opportunities across
        Ops/Finance/HR/IR/Legal, (2) two production‑grade pilots with measured ROI, and (3) an
        adoption plan for non‑technical users. Uses ChatGPT Enterprise connectors + Deep Research;
        no rip‑and‑replace.
      </p>
    </UCard>

    <div class="grid gap-4 md:grid-cols-3">
      <UCard>
        <template #header
          ><span class="text-lg font-medium"
            >Phase 1 — Discovery & Baseline (Weeks 1–2)</span
          ></template
        >
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>Stakeholder map; capture candidate workflows with metrics sheets.</li>
          <li>Stand up connectors to reduce knowledge friction.</li>
          <li>Publish an Opportunity Hopper (scoring template).</li>
        </ul>
      </UCard>
      <UCard>
        <template #header
          ><span class="text-lg font-medium"
            >Phase 2 — Prioritize & Pilot (Weeks 3–6)</span
          ></template
        >
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>Pick Top‑5 by RICE; launch 2 quick‑win pilots.</li>
          <li>Acceptance criteria per pilot (numeric pass/fail gates).</li>
          <li>Enablement: micro‑videos + job aids.</li>
        </ul>
      </UCard>
      <UCard>
        <template #header
          ><span class="text-lg font-medium">Phase 3 — Scale & Govern (Weeks 7–9)</span></template
        >
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li>Graduate pilots that hit gates; expand to next teams.</li>
          <li>Governance: permissions‑inherit, citations‑on, audit logs.</li>
          <li>Quarterly ROI roll‑up + roadmap.</li>
        </ul>
      </UCard>
    </div>

    <USeparator />

    <UCard>
      <template #header><span class="text-lg font-medium">Evaluation Method</span></template>
      <ol class="list-decimal pl-5 space-y-1 text-sm">
        <li>Inventory & shadow sessions; collect artifacts and SOPs.</li>
        <li>Measure baseline minutes, defects, and cycle time.</li>
        <li>Quantify unit economics: volume, minutes, loaded rate, queue/defect.</li>
        <li>Score: Impact ($/mo), Effort, Risk, Confidence; compute RICE.</li>
        <li>Pilot with numeric acceptance criteria.</li>
        <li>Prove with A/B or pre/post; instrument results.</li>
      </ol>
    </UCard>

    <USeparator />

    <UCard>
      <template #header
        ><span class="text-lg font-medium">Candidate Quick Wins (examples)</span></template
      >
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li>Investor/LP reporting assist with citations in Office.</li>
        <li>Due‑diligence packet triage and checklist generation.</li>
        <li>Policy/FAQ assistant for Ops/HR/IT with escalation.</li>
        <li>Contract review aide (clause extraction & variance highlights).</li>
      </ul>
    </UCard>

    <USeparator />

    <UCard>
      <template #header
        ><span class="text-lg font-medium">Acceptance Gates (per quick win)</span></template
      >
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li>≥ X% reduction in minutes/task with 95% confidence (n≥30).</li>
        <li>Defect rate not worse than baseline (ideally improved).</li>
        <li>Adoption: target weekly active users within 14 days.</li>
        <li>Compliance: zero permission violations; citations on answers.</li>
      </ul>
    </UCard>

    <UCard>
      <template #header><span class="text-lg font-medium">Architecture Stance</span></template>
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li>ChatGPT Enterprise connectors + Deep Research; MCP where needed.</li>
        <li>No custom vector DB in v1; revisit for narrow, high‑volume lanes.</li>
        <li>Security: SSO/SCIM; permission‑inherit; audit logs; PII rules.</li>
      </ul>
    </UCard>

    <UCard>
      <template #header><span class="text-lg font-medium">What You’ll See Weekly</span></template>
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li>Updated Opportunity Hopper with scores and baselines.</li>
        <li>Pilot scorecards with pre/post numbers and go/no‑go.</li>
        <li>Adoption dashboard for target cohorts.</li>
      </ul>
    </UCard>
  </div>
</template>
