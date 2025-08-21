<script setup lang="ts">
type Row = { kpi: string; definition: string; method: string }
const core: Row[] = [
  {
    kpi: 'Minutes per task',
    definition: 'Active work minutes to complete a task',
    method: 'Time sampling; exclude queue time',
  },
  { kpi: 'Cycle time', definition: 'Start→finish elapsed time', method: 'Timestamps on artifacts' },
  {
    kpi: 'Defect rate',
    definition: '% of tasks failing QC/rework',
    method: 'QC checklist; revision counts',
  },
  { kpi: 'First‑pass yield', definition: '% completed without rework', method: 'QC logs' },
  {
    kpi: 'Throughput',
    definition: 'Tasks per person per week',
    method: 'Completed tasks in system of record',
  },
  { kpi: 'Adoption', definition: 'Weekly active users / cohort', method: 'Platform analytics' },
]
type DRow = { area: string; kpi: string; definition: string; method: string }
const domain: DRow[] = [
  {
    area: 'Retrieval/Knowledge',
    kpi: 'Task success rate',
    definition: 'Correct doc/answer within SLA with citation',
    method: 'Task bank weekly (n≥30)',
  },
  {
    area: 'Retrieval/Knowledge',
    kpi: 'Time‑to‑answer',
    definition: 'Seconds to first correct result',
    method: 'Observer timing; chat logs',
  },
  {
    area: 'LP Reporting',
    kpi: 'Prep minutes/report',
    definition: 'Data collection + drafting time',
    method: 'Time sampling; template timestamps',
  },
  {
    area: 'LP Reporting',
    kpi: 'Revision cycles',
    definition: '# of redlines per report',
    method: 'File version history',
  },
  {
    area: 'Due Diligence',
    kpi: 'Docs triaged/hour',
    definition: 'Classification & extraction rate',
    method: 'Batch logs',
  },
  {
    area: 'Due Diligence',
    kpi: 'Checklist completeness',
    definition: '% of required items present',
    method: 'QC checklist',
  },
  {
    area: 'HR/Onboarding',
    kpi: 'Time‑to‑onboard',
    definition: 'Offer→day‑one elapsed time',
    method: 'HRIS timestamps',
  },
  {
    area: 'Finance/Close',
    kpi: 'Close‑cycle days',
    definition: 'Month‑end day count',
    method: 'Calendar/ERP',
  },
  {
    area: 'Compliance',
    kpi: 'Policy lookup time',
    definition: 'Seconds to correct policy',
    method: 'Task samples',
  },
]

function printPage() {
  window.print()
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">KPI Catalog</h1>
      <div class="flex gap-2">
        <UButton icon="i-lucide-printer" variant="outline" @click="printPage"
          >Print / Save PDF</UButton
        >
      </div>
    </div>
    <UCard>
      <template #header>Core Measurement</template>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead class="sticky top-0 z-10 bg-default">
            <tr class="border-b">
              <th class="px-2 py-2 text-left uppercase tracking-wide text-toned">KPI</th>
              <th class="px-2 py-2 text-left uppercase tracking-wide text-toned">Definition</th>
              <th class="px-2 py-2 text-left uppercase tracking-wide text-toned">Method</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, i) in core" :key="i" class="border-b odd:bg-muted/40">
              <td class="px-2 py-2">{{ r.kpi }}</td>
              <td class="px-2 py-2">{{ r.definition }}</td>
              <td class="px-2 py-2">{{ r.method }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>

    <UCard>
      <template #header>Domain‑Specific</template>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead class="sticky top-0 z-10 bg-default">
            <tr class="border-b">
              <th class="px-2 py-2 text-left uppercase tracking-wide text-toned">Area</th>
              <th class="px-2 py-2 text-left uppercase tracking-wide text-toned">KPI</th>
              <th class="px-2 py-2 text-left uppercase tracking-wide text-toned">Definition</th>
              <th class="px-2 py-2 text-left uppercase tracking-wide text-toned">Method</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, i) in domain" :key="i" class="border-b odd:bg-muted/40">
              <td class="px-2 py-2">{{ r.area }}</td>
              <td class="px-2 py-2">{{ r.kpi }}</td>
              <td class="px-2 py-2">{{ r.definition }}</td>
              <td class="px-2 py-2">{{ r.method }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </div>
</template>
