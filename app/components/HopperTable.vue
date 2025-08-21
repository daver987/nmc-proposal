<script setup lang="ts">
import Papa from 'papaparse'
import { useStorage } from '@vueuse/core'
import type { TableColumn } from '@nuxt/ui'

type Row = {
  Area: string
  Workflow: string
  'Volume/week'?: number | string
  'Avg minutes/task'?: number | string
  'Loaded $/hr'?: number | string
  'Defect rate %'?: number | string
  'Cycle time (days)'?: number | string
  'Queue time (days)'?: number | string
  'Data readiness (1-5)'?: number | string
  'Integration complexity (1-5)'?: number | string
  'Change impact (1-5)'?: number | string
  'Risk (1-5)'?: number | string
  'Confidence (0-100%)'?: number | string
  'Minutes saved/task'?: number | string
  '$/defect'?: number | string
  'Days saved'?: number | string
  '$/day'?: number | string
  'Impact $/mo'?: number
  'Effort score'?: number
  'RICE score'?: number
  Notes?: string
}

const rows = useStorage<Row[]>('hopper-rows', [])

const columns: TableColumn<Row>[] = [
  { accessorKey: 'Area', header: 'Area' },
  { accessorKey: 'Workflow', header: 'Workflow' },
  {
    id: 'volWeek',
    accessorKey: 'Volume/week',
    header: 'Vol/wk',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right' } },
  },
  {
    id: 'avgMin',
    accessorKey: 'Avg minutes/task',
    header: 'Min/task',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right' } },
  },
  {
    id: 'rate',
    accessorKey: 'Loaded $/hr',
    header: '$/hr',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right' } },
  },
  {
    id: 'defectRate',
    accessorKey: 'Defect rate %',
    header: 'Defect %',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right' } },
  },
  {
    id: 'dataReady',
    accessorKey: 'Data readiness (1-5)',
    header: 'Data',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right' } },
  },
  {
    id: 'integration',
    accessorKey: 'Integration complexity (1-5)',
    header: 'Integr',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right' } },
  },
  {
    id: 'change',
    accessorKey: 'Change impact (1-5)',
    header: 'Change',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right' } },
  },
  {
    id: 'confidence',
    accessorKey: 'Confidence (0-100%)',
    header: 'Conf%',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right' } },
  },
  {
    id: 'minSaved',
    accessorKey: 'Minutes saved/task',
    header: 'Min saved',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right' } },
  },
  {
    id: 'perDefect',
    accessorKey: '$/defect',
    header: '$/defect',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right' } },
  },
  {
    id: 'impact',
    accessorKey: 'Impact $/mo',
    header: 'Impact $/mo',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right tabular-nums' } },
  },
  {
    id: 'effort',
    accessorKey: 'Effort score',
    header: 'Effort',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right tabular-nums' } },
  },
  {
    id: 'rice',
    accessorKey: 'RICE score',
    header: 'RICE',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right tabular-nums' } },
  },
]

function parseNumber(v: any) {
  const n = typeof v === 'string' ? parseFloat(v.replace(/,/g, '')) : Number(v)
  return isFinite(n) ? n : 0
}

function compute(row: Row) {
  const tasksPerMonth = parseNumber(row['Volume/week']) * 4.33
  const avgMinutes = parseNumber(row['Avg minutes/task'])
  const rate = parseNumber(row['Loaded $/hr'])
  const minutesSaved = parseNumber(row['Minutes saved/task'])
  const defectRate = parseNumber(row['Defect rate %']) / 100
  const dollarsPerDefect = parseNumber(row['$/defect'])
  const daysSaved = parseNumber(row['Days saved'])
  const dollarsPerDay = parseNumber(row['$/day'])
  const dataReady = parseNumber(row['Data readiness (1-5)'])
  const integration = parseNumber(row['Integration complexity (1-5)'])
  const change = parseNumber(row['Change impact (1-5)'])
  const confidence = Math.min(100, Math.max(0, parseNumber(row['Confidence (0-100%)'])))

  // Labor savings = (Minutes saved/task ÷ 60) × Tasks/month × Loaded $/hr
  const laborSavings = (minutesSaved / 60) * tasksPerMonth * rate

  // Error avoidance = (Baseline defects% − Post defects%) × Tasks/month × $/defect
  // Assuming 50% defect reduction for demo purposes
  const postDefectRate = defectRate * 0.5 // 50% reduction
  const defectReduction = defectRate - postDefectRate
  const errorAvoidance = defectReduction * tasksPerMonth * dollarsPerDefect

  // Cycle-time value = Days saved × $/day
  const cycleTimeValue = daysSaved * dollarsPerDay

  const impact = laborSavings + errorAvoidance + cycleTimeValue
  const effort = dataReady + integration + change
  const rice = effort > 0 ? (impact * (confidence / 100)) / effort : 0

  row['Impact $/mo'] = Math.round(impact)
  row['Effort score'] = Math.round(effort)
  row['RICE score'] = Math.round(rice)
}

function recomputeAll() {
  rows.value.forEach(compute)
}

function bump(row: Row, key: keyof Row, delta: number) {
  const val = parseNumber(row[key] as any) + delta
  ;(row as any)[key] = Math.round(val * 100) / 100
  compute(row)
}

function onFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  Papa.parse<Row>(file, {
    header: true,
    skipEmptyLines: true,
    complete: (res) => {
      rows.value = res.data
      recomputeAll()
    },
  })
}

function exportCSV() {
  const csv = Papa.unparse(rows.value)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'hopper_export.csv'
  a.click()
  URL.revokeObjectURL(url)
}

// Seed with demo data if empty
onMounted(async () => {
  if (rows.value.length > 0) return

  // Add demo data based on the guide examples
  rows.value = [
    {
      Area: 'IR',
      Workflow: 'LP reporting draft',
      'Volume/week': 8,
      'Avg minutes/task': 120,
      'Loaded $/hr': 110,
      'Defect rate %': 20,
      'Data readiness (1-5)': 2,
      'Integration complexity (1-5)': 2,
      'Change impact (1-5)': 2,
      'Confidence (0-100%)': 70,
      'Minutes saved/task': 36,
      '$/defect': 150,
      'Days saved': 0,
      '$/day': 0,
      Notes: 'ChatGPT assist for initial drafts',
    },
    {
      Area: 'Legal',
      Workflow: 'DD packet triage',
      'Volume/week': 10,
      'Avg minutes/task': 45,
      'Loaded $/hr': 95,
      'Defect rate %': 15,
      'Data readiness (1-5)': 3,
      'Integration complexity (1-5)': 2,
      'Change impact (1-5)': 3,
      'Confidence (0-100%)': 60,
      'Minutes saved/task': 22.5,
      '$/defect': 200,
      'Days saved': 0,
      '$/day': 0,
      Notes: 'Document classification automation',
    },
    {
      Area: 'Finance',
      Workflow: 'Monthly close checklist',
      'Volume/week': 4,
      'Avg minutes/task': 90,
      'Loaded $/hr': 85,
      'Defect rate %': 10,
      'Data readiness (1-5)': 2,
      'Integration complexity (1-5)': 3,
      'Change impact (1-5)': 2,
      'Confidence (0-100%)': 80,
      'Minutes saved/task': 25,
      '$/defect': 300,
      'Days saved': 1,
      '$/day': 500,
      Notes: 'Automated variance analysis',
    },
    {
      Area: 'HR',
      Workflow: 'New hire onboarding',
      'Volume/week': 2,
      'Avg minutes/task': 180,
      'Loaded $/hr': 75,
      'Defect rate %': 25,
      'Data readiness (1-5)': 4,
      'Integration complexity (1-5)': 3,
      'Change impact (1-5)': 4,
      'Confidence (0-100%)': 50,
      'Minutes saved/task': 60,
      '$/defect': 250,
      'Days saved': 2,
      '$/day': 200,
      Notes: 'Workflow automation needed',
    },
    {
      Area: 'Ops',
      Workflow: 'Portfolio company reporting',
      'Volume/week': 6,
      'Avg minutes/task': 75,
      'Loaded $/hr': 90,
      'Defect rate %': 18,
      'Data readiness (1-5)': 3,
      'Integration complexity (1-5)': 2,
      'Change impact (1-5)': 2,
      'Confidence (0-100%)': 65,
      'Minutes saved/task': 30,
      '$/defect': 175,
      'Days saved': 0,
      '$/day': 0,
      Notes: 'Template standardization + AI assist',
    },
  ]
  recomputeAll()
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <UButton variant="soft" icon="i-lucide-download" @click="exportCSV">Export CSV</UButton>
        <label class="inline-flex items-center gap-2">
          <UButton variant="subtle" icon="i-lucide-upload">Import CSV</UButton>
          <input type="file" accept=".csv" class="hidden" @change="onFile" />
        </label>
      </div>
      <UButton variant="outline" @click="recomputeAll">Recompute</UButton>
    </div>

    <UTable :data="rows" :columns="columns" sticky>
      <template #volWeek-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['Volume/week']"
            size="xs"
            variant="subtle"
            :step="1"
            :min="0"
            class="w-24"
            @update:modelValue="compute(row.original)"
          />
        </div>
      </template>
      <template #avgMin-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['Avg minutes/task']"
            size="xs"
            variant="subtle"
            :step="1"
            :min="0"
            class="w-24"
            @update:modelValue="compute(row.original)"
          />
        </div>
      </template>
      <template #rate-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['Loaded $/hr']"
            size="xs"
            variant="subtle"
            :step="5"
            :min="0"
            :format-options="{ style: 'currency', currency: 'USD' }"
            class="w-28"
            @update:modelValue="compute(row.original)"
          />
        </div>
      </template>
      <template #defectRate-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['Defect rate %']"
            size="xs"
            variant="subtle"
            :step="1"
            :min="0"
            :max="100"
            class="w-20"
            @update:modelValue="compute(row.original)"
          />
        </div>
      </template>
      <template #dataReady-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['Data readiness (1-5)']"
            size="xs"
            variant="subtle"
            :step="1"
            :min="1"
            :max="5"
            class="w-16"
            @update:modelValue="compute(row.original)"
          />
        </div>
      </template>
      <template #integration-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['Integration complexity (1-5)']"
            size="xs"
            variant="subtle"
            :step="1"
            :min="1"
            :max="5"
            class="w-16"
            @update:modelValue="compute(row.original)"
          />
        </div>
      </template>
      <template #change-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['Change impact (1-5)']"
            size="xs"
            variant="subtle"
            :step="1"
            :min="1"
            :max="5"
            class="w-16"
            @update:modelValue="compute(row.original)"
          />
        </div>
      </template>
      <template #confidence-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['Confidence (0-100%)']"
            size="xs"
            variant="subtle"
            :step="5"
            :min="0"
            :max="100"
            class="w-20"
            @update:modelValue="compute(row.original)"
          />
        </div>
      </template>
      <template #minSaved-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['Minutes saved/task']"
            size="xs"
            variant="subtle"
            :step="1"
            :min="0"
            class="w-24"
            @update:modelValue="compute(row.original)"
          />
        </div>
      </template>
      <template #perDefect-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['$/defect']"
            size="xs"
            variant="subtle"
            :step="10"
            :min="0"
            :format-options="{ style: 'currency', currency: 'USD' }"
            class="w-28"
            @update:modelValue="compute(row.original)"
          />
        </div>
      </template>
      <template #impact-cell="{ row }">
        <div class="text-right tabular-nums">
          {{ row.original['Impact $/mo']?.toLocaleString?.() ?? '-' }}
        </div>
      </template>
      <template #effort-cell="{ row }">
        <div class="text-right tabular-nums">{{ row.original['Effort score'] ?? '-' }}</div>
      </template>
      <template #rice-cell="{ row }">
        <div class="text-right tabular-nums">
          <UBadge color="primary" variant="soft">{{ row.original['RICE score'] ?? '-' }}</UBadge>
        </div>
      </template>
    </UTable>

    <!-- Legend/Help Section -->
    <div class="mt-8 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
      <h3 class="text-sm font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
        Column Guide
      </h3>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-neutral-600 dark:text-neutral-400"
      >
        <div><strong>Vol/wk:</strong> How many times this workflow happens per week</div>
        <div>
          <strong>Min/task:</strong> Average active work minutes to complete one task (baseline)
        </div>
        <div><strong>$/hr:</strong> Fully-loaded hourly cost (salary + benefits ÷ 2000)</div>
        <div><strong>Defect %:</strong> % of tasks needing rework or failing QC</div>
        <div>
          <strong>Data:</strong> How clean/available inputs are (1=centralized, 5=scattered)
        </div>
        <div><strong>Integr:</strong> How hard to wire up (1=O365/Drive, 5=multiple systems)</div>
        <div><strong>Change:</strong> Behavior change required (1=drop-in, 5=new process)</div>
        <div><strong>Conf%:</strong> How sure you are in your numbers (start at 50%)</div>
        <div><strong>Min saved:</strong> Minutes saved per task after micro-trial</div>
        <div><strong>$/defect:</strong> Cost of one defect/rework (from QA/historical data)</div>
        <div><strong>Impact $/mo:</strong> Labor savings + Error avoidance + Cycle-time value</div>
        <div><strong>Effort:</strong> Data + Integration + Change complexity (3-15 range)</div>
        <div><strong>RICE:</strong> (Impact × Confidence%) ÷ Effort — higher = better priority</div>
      </div>
    </div>
  </div>
</template>
