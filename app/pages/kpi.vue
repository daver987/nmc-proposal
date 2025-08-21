<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

type Row = { kpi: string; definition: string; method: string }
type DRow = { area: string; kpi: string; definition: string; method: string }

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

const coreColumns: TableColumn<Row>[] = [
  { accessorKey: 'kpi', header: 'KPI' },
  { accessorKey: 'definition', header: 'Definition' },
  { accessorKey: 'method', header: 'Method' },
]

const domainColumns: TableColumn<DRow>[] = [
  { accessorKey: 'area', header: 'Area' },
  { accessorKey: 'kpi', header: 'KPI' },
  { accessorKey: 'definition', header: 'Definition' },
  { accessorKey: 'method', header: 'Method' },
]

function printPage() {
  window.print()
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">KPI Catalog</h1>
      <UButton icon="i-lucide-printer" variant="outline" @click="printPage">
        Print / Save PDF
      </UButton>
    </div>

    <div class="space-y-3">
      <h2 class="text-lg font-medium mb-3">Core Measurement</h2>
      <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
        <UTable
          :data="core"
          :columns="coreColumns"
          :ui="{
            root: 'w-full',
            base: 'w-full',
            tbody:
              'divide-y divide-neutral-200 dark:divide-neutral-700 [&>tr:nth-child(odd)]:bg-neutral-50 dark:[&>tr:nth-child(odd)]:bg-neutral-800/50',
            td: 'px-4 py-2 text-sm whitespace-nowrap',
            th: 'px-4 py-2 text-sm font-semibold bg-neutral-100 dark:bg-neutral-800',
          }"
        />
      </div>
    </div>

    <div class="space-y-3">
      <h2 class="text-lg font-medium mb-3">Domain‑Specific</h2>
      <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
        <UTable
          :data="domain"
          :columns="domainColumns"
          :ui="{
            root: 'w-full',
            base: 'w-full',
            tbody:
              'divide-y divide-neutral-200 dark:divide-neutral-700 [&>tr:nth-child(odd)]:bg-neutral-50 dark:[&>tr:nth-child(odd)]:bg-neutral-800/50',
            td: 'px-4 py-2 text-sm whitespace-nowrap',
            th: 'px-4 py-2 text-sm font-semibold bg-neutral-100 dark:bg-neutral-800',
          }"
        />
      </div>
    </div>
  </div>
</template>
