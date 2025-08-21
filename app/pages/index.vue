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
  <div class="space-y-12">
    <div class="text-center space-y-6 py-8">
      <div class="space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold">Operational AI Audit & Activation</h1>
        <p class="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Proposal for New Mountain Capital
        </p>
      </div>
    </div>

    <section class="p-8">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-6 text-center">Objective</h2>
        <div class="text-center mb-6">
          <p class="text-lg text-neutral-700 dark:text-neutral-300">
            In <strong>45–60 days</strong>, deliver:
          </p>
        </div>
        <div class="grid gap-4 md:grid-cols-3 mb-6">
          <div class="flex items-start gap-3 p-4 bg-white/60 dark:bg-neutral-800/60 rounded-lg">
            <div
              class="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
            >
              1
            </div>
            <div class="text-sm">
              <strong>Prioritized map</strong> of high‑impact AI opportunities across
              Ops/Finance/HR/IR/Legal
            </div>
          </div>
          <div class="flex items-start gap-3 p-4 bg-white/60 dark:bg-neutral-800/60 rounded-lg">
            <div
              class="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
            >
              2
            </div>
            <div class="text-sm">
              <strong>Two production‑grade pilots</strong> with measured ROI
            </div>
          </div>
          <div class="flex items-start gap-3 p-4 bg-white/60 dark:bg-neutral-800/60 rounded-lg">
            <div
              class="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
            >
              3
            </div>
            <div class="text-sm"><strong>Adoption plan</strong> for non‑technical users</div>
          </div>
        </div>
        <div class="text-center text-sm text-neutral-600 dark:text-neutral-400">
          Uses ChatGPT Enterprise connectors + Deep Research; no rip‑and‑replace.
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-3xl font-bold text-center mb-8">Three-Phase Approach</h2>
      <div class="grid gap-6 lg:grid-cols-3">
        <div
          class="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-6 space-y-4"
        >
          <div class="text-center">
            <div
              class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xl font-bold mb-3"
            >
              1
            </div>
            <h3 class="text-xl font-semibold">Discovery & Baseline</h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Weeks 1–2</p>
          </div>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start gap-2">
              <span>•</span>
              <span>Stakeholder map; capture candidate workflows with metrics sheets</span>
            </li>
            <li class="flex items-start gap-2">
              <span>•</span>
              <span>Stand up connectors to reduce knowledge friction</span>
            </li>
            <li class="flex items-start gap-2">
              <span>•</span>
              <span>Publish an Opportunity Hopper (scoring template)</span>
            </li>
          </ul>
        </div>

        <div
          class="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-6 space-y-4"
        >
          <div class="text-center">
            <div
              class="inline-flex items-center justify-center w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-xl font-bold mb-3"
            >
              2
            </div>
            <h3 class="text-xl font-semibold">Prioritize & Pilot</h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Weeks 3–6</p>
          </div>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start gap-2">
              <span>•</span>
              <span>Pick Top‑5 by RICE; launch 2 quick‑win pilots</span>
            </li>
            <li class="flex items-start gap-2">
              <span>•</span>
              <span>Acceptance criteria per pilot (numeric pass/fail gates)</span>
            </li>
            <li class="flex items-start gap-2">
              <span>•</span>
              <span>Enablement: micro‑videos + job aids</span>
            </li>
          </ul>
        </div>

        <div
          class="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl p-6 space-y-4"
        >
          <div class="text-center">
            <div
              class="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xl font-bold mb-3"
            >
              3
            </div>
            <h3 class="text-xl font-semibold">Scale & Govern</h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">Weeks 7–9</p>
          </div>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start gap-2">
              <span>•</span>
              <span>Graduate pilots that hit gates; expand to next teams</span>
            </li>
            <li class="flex items-start gap-2">
              <span>•</span>
              <span>Governance: permissions‑inherit, citations‑on, audit logs</span>
            </li>
            <li class="flex items-start gap-2">
              <span>•</span>
              <span>Quarterly ROI roll‑up + roadmap</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Evaluation Method -->
    <section class="py-12">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-8">Evaluation Method</h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-4">
            <div class="flex items-start gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg">
              <div
                class="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold"
              >
                1
              </div>
              <div class="text-sm">
                <div class="font-semibold mb-1">Discovery</div>
                Inventory & shadow sessions; collect artifacts and SOPs
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg">
              <div
                class="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold"
              >
                2
              </div>
              <div class="text-sm">
                <div class="font-semibold mb-1">Baseline</div>
                Measure baseline minutes, defects, and cycle time
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg">
              <div
                class="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold"
              >
                3
              </div>
              <div class="text-sm">
                <div class="font-semibold mb-1">Economics</div>
                Quantify unit economics: volume, minutes, loaded rate, queue/defect
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <div class="flex items-start gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg">
              <div
                class="flex-shrink-0 w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold"
              >
                4
              </div>
              <div class="text-sm">
                <div class="font-semibold mb-1">Score</div>
                Impact ($/mo), Effort, Risk, Confidence; compute RICE
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg">
              <div
                class="flex-shrink-0 w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold"
              >
                5
              </div>
              <div class="text-sm">
                <div class="font-semibold mb-1">Pilot</div>
                Launch with numeric acceptance criteria
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg">
              <div
                class="flex-shrink-0 w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold"
              >
                6
              </div>
              <div class="text-sm">
                <div class="font-semibold mb-1">Prove</div>
                A/B or pre/post testing; instrument results
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Two Column Section: Quick Wins & Acceptance Gates -->
    <section class="grid gap-8 lg:grid-cols-2">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Candidate Quick Wins</h2>
        <p class="text-neutral-600 dark:text-neutral-400 text-sm">
          Examples of high-impact opportunities
        </p>
        <div class="space-y-3">
          <div
            class="flex items-start gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg"
          >
            <div class="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <span class="text-sm">Investor/LP reporting assist with citations in Office</span>
          </div>
          <div
            class="flex items-start gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg"
          >
            <div class="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <span class="text-sm">Due‑diligence packet triage and checklist generation</span>
          </div>
          <div
            class="flex items-start gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg"
          >
            <div class="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <span class="text-sm">Policy/FAQ assistant for Ops/HR/IT with escalation</span>
          </div>
          <div
            class="flex items-start gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg"
          >
            <div class="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <span class="text-sm"
              >Contract review aide (clause extraction & variance highlights)</span
            >
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Acceptance Gates</h2>
        <p class="text-neutral-600 dark:text-neutral-400 text-sm">Per quick win pilot</p>
        <div class="space-y-3">
          <div
            class="flex items-start gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg"
          >
            <div class="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <span class="text-sm">≥ X% reduction in minutes/task with 95% confidence (n≥30)</span>
          </div>
          <div
            class="flex items-start gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg"
          >
            <div class="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <span class="text-sm">Defect rate not worse than baseline (ideally improved)</span>
          </div>
          <div
            class="flex items-start gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg"
          >
            <div class="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <span class="text-sm">Adoption: target weekly active users within 14 days</span>
          </div>
          <div
            class="flex items-start gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg"
          >
            <div class="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <span class="text-sm"
              >Compliance: zero permission violations; citations on answers</span
            >
          </div>
        </div>
      </div>
    </section>

    <section class="grid gap-8 lg:grid-cols-2">
      <div
        class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 space-y-4"
      >
        <h3 class="text-xl font-semibold">Architecture Stance</h3>
        <ul class="space-y-2 text-sm">
          <li class="flex items-start gap-2">
            <span>•</span>
            <span>ChatGPT Enterprise connectors + Deep Research; MCP where needed</span>
          </li>
          <li class="flex items-start gap-2">
            <span>•</span>
            <span>No custom vector DB in v1; revisit for narrow, high‑volume lanes</span>
          </li>
          <li class="flex items-start gap-2">
            <span>•</span>
            <span>Security: SSO/SCIM; permission‑inherit; audit logs; PII rules</span>
          </li>
        </ul>
      </div>

      <div
        class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 space-y-4"
      >
        <h3 class="text-xl font-semibold">What You'll See Weekly</h3>
        <ul class="space-y-2 text-sm">
          <li class="flex items-start gap-2">
            <span>•</span>
            <span>Updated Opportunity Hopper with scores and baselines</span>
          </li>
          <li class="flex items-start gap-2">
            <span>•</span>
            <span>Pilot scorecards with pre/post numbers and go/no‑go</span>
          </li>
          <li class="flex items-start gap-2">
            <span>•</span>
            <span>Adoption dashboard for target cohorts</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="text-center py-8">
      <div class="space-y-6">
        <h2 class="text-2xl font-bold">Explore the Tools</h2>
        <p class="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Use the interactive calculators and templates to understand the impact and approach
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <UButton to="/roi" size="lg" color="primary">ROI Calculator</UButton>
          <UButton to="/hopper" size="lg" variant="outline">Opportunity Hopper</UButton>
          <UButton to="/kpi" size="lg" variant="outline">KPI Catalog</UButton>
        </div>
      </div>
    </section>
  </div>
</template>
