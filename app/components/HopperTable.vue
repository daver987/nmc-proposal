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
  'Delta defects/month'?: number | string
  '$ per defect'?: number | string
  'Cycle days saved'?: number | string
  '$ per day'?: number | string
  'Defect rate %'?: number | string
  'Cycle time (days)'?: number | string
  'Queue time (days)'?: number | string
  'Data readiness (1-5)'?: number | string
  'Integration complexity (1-5)'?: number | string
  'Change impact (1-5)'?: number | string
  'Risk (1-5)'?: number | string
  'Confidence (0-100%)'?: number | string
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
    id: 'deltaDef',
    accessorKey: 'Delta defects/month',
    header: 'Δ defects/mo',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right' } },
  },
  {
    id: 'perDef',
    accessorKey: '$ per defect',
    header: '$/defect',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right' } },
  },
  {
    id: 'cycleDays',
    accessorKey: 'Cycle days saved',
    header: 'Cycle days',
    meta: { class: { th: 'text-center whitespace-nowrap', td: 'text-right' } },
  },
  {
    id: 'perDay',
    accessorKey: '$ per day',
    header: '$/day',
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
  const volPerMonth = parseNumber(row['Volume/week']) * 4.33
  const avgMinutes = parseNumber(row['Avg minutes/task'])
  const rate = parseNumber(row['Loaded $/hr'])
  const deltaDefects = parseNumber(row['Delta defects/month'])
  const dollarsPerDefect = parseNumber(row['$ per defect'])
  const cycleDaysSaved = parseNumber(row['Cycle days saved'])
  const dollarsPerDay = parseNumber(row['$ per day'])
  const dataReady = parseNumber(row['Data readiness (1-5)'])
  const integration = parseNumber(row['Integration complexity (1-5)'])
  const change = parseNumber(row['Change impact (1-5)'])
  const confidence = Math.min(100, Math.max(0, parseNumber(row['Confidence (0-100%)'])))
  const labor = (avgMinutes / 60) * volPerMonth * rate
  const avoidance = deltaDefects * dollarsPerDefect
  const cycle = cycleDaysSaved * dollarsPerDay
  const impact = labor + avoidance + cycle
  const effort = dataReady + integration + change
  const rice = effort > 0 ? (volPerMonth * impact * (confidence / 100)) / effort : 0
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

// Seed from bundled template once if empty
onMounted(async () => {
  if (rows.value.length > 0) return
  try {
    const res = await fetch('/reference/NMC_Opportunity_Scoring_Template.csv')
    if (!res.ok) return
    const text = await res.text()
    const parsed = Papa.parse<Row>(text, { header: true, skipEmptyLines: true })
    rows.value = parsed.data
    recomputeAll()
  } catch {
    // ignore seed errors
  }
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
      <template #deltaDef-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['Delta defects/month']"
            size="xs"
            variant="subtle"
            :step="1"
            :min="0"
            class="w-24"
            @update:modelValue="compute(row.original)"
          />
        </div>
      </template>
      <template #perDef-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['$ per defect']"
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
      <template #cycleDays-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['Cycle days saved']"
            size="xs"
            variant="subtle"
            :step="1"
            :min="0"
            class="w-20"
            @update:modelValue="compute(row.original)"
          />
        </div>
      </template>
      <template #perDay-cell="{ row }">
        <div class="flex items-center justify-end">
          <UInputNumber
            v-model="row.original['$ per day']"
            size="xs"
            variant="subtle"
            :step="50"
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
  </div>
</template>
