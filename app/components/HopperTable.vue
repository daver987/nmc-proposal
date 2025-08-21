<script setup lang="ts">
import Papa from 'papaparse'
import { useStorage } from '@vueuse/core'

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
  'Impact $/mo'?: number
  'Effort score'?: number
  'RICE score'?: number
  Notes?: string
}

const rows = useStorage<Row[]>('hopper-rows', [])

function parseNumber(v: any) {
  const n = typeof v === 'string' ? parseFloat(v.replace(/,/g, '')) : Number(v)
  return isFinite(n) ? n : 0
}

function compute(row: Row) {
  const volPerMonth = parseNumber(row['Volume/week']) * 4.33
  const avgMinutes = parseNumber(row['Avg minutes/task'])
  const rate = parseNumber(row['Loaded $/hr'])
  const dataReady = parseNumber(row['Data readiness (1-5)'])
  const integration = parseNumber(row['Integration complexity (1-5)'])
  const change = parseNumber(row['Change impact (1-5)'])
  const confidence = Math.min(100, Math.max(0, parseNumber(row['Confidence (0-100%)'])))
  const impact = (avgMinutes / 60) * volPerMonth * rate
  const effort = dataReady + integration + change
  const rice = effort > 0 ? (volPerMonth * impact * (confidence / 100)) / effort : 0
  row['Impact $/mo'] = Math.round(impact)
  row['Effort score'] = Math.round(effort)
  row['RICE score'] = Math.round(rice)
}

function recomputeAll() {
  rows.value.forEach(compute)
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
    }
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
if (rows.value.length === 0) {
  const url = '/docs/reference/NMC_Opportunity_Scoring_Template.csv'
  fetch(url)
    .then((r) => r.text())
    .then((t) => {
      const res = Papa.parse<Row>(t, { header: true, skipEmptyLines: true })
      rows.value = res.data
      recomputeAll()
    })
    .catch(() => {})
}
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

    <UTable :rows="rows" :columns="[
      { key: 'Area' },
      { key: 'Workflow' },
      { key: 'Volume/week', label: 'Vol/wk' },
      { key: 'Avg minutes/task', label: 'Min/task' },
      { key: 'Loaded $/hr', label: '$/hr' },
      { key: 'Impact $/mo', label: 'Impact $/mo' },
      { key: 'Effort score', label: 'Effort' },
      { key: 'RICE score', label: 'RICE' }
    ]">
      <template #"Volume/week"-data="{ row }">
        <UInput v-model="row['Volume/week']" type="number" @change="compute(row)" />
      </template>
      <template #"Avg minutes/task"-data="{ row }">
        <UInput v-model="row['Avg minutes/task']" type="number" @change="compute(row)" />
      </template>
      <template #"Loaded $/hr"-data="{ row }">
        <UInput v-model="row['Loaded $/hr']" type="number" @change="compute(row)" />
      </template>
      <template #"Impact $/mo"-data="{ row }">
        <span class="tabular-nums">{{ row['Impact $/mo']?.toLocaleString?.() ?? '-' }}</span>
      </template>
      <template #"Effort score"-data="{ row }">
        <span class="tabular-nums">{{ row['Effort score'] ?? '-' }}</span>
      </template>
      <template #"RICE score"-data="{ row }">
        <UBadge color="primary" variant="soft" class="tabular-nums">{{ row['RICE score'] ?? '-' }}</UBadge>
      </template>
    </UTable>
  </div>
</template>

