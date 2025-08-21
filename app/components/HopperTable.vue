<script setup lang="ts">
import Papa from 'papaparse'
import { useStorage } from '@vueuse/core'

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

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="sticky top-0 z-10 bg-default">
          <tr class="border-b">
            <th class="p-2 text-left text-xs uppercase tracking-wide text-toned">Area</th>
            <th class="p-2 text-left text-xs uppercase tracking-wide text-toned">Workflow</th>
            <th class="p-2 text-right text-xs uppercase tracking-wide text-toned">Vol/wk</th>
            <th class="p-2 text-right text-xs uppercase tracking-wide text-toned">Min/task</th>
            <th class="p-2 text-right text-xs uppercase tracking-wide text-toned">$/hr</th>
            <th class="p-2 text-right text-xs uppercase tracking-wide text-toned">Δ defects/mo</th>
            <th class="p-2 text-right text-xs uppercase tracking-wide text-toned">$/defect</th>
            <th class="p-2 text-right text-xs uppercase tracking-wide text-toned">Cycle days</th>
            <th class="p-2 text-right text-xs uppercase tracking-wide text-toned">$/day</th>
            <th class="p-2 text-right text-xs uppercase tracking-wide text-toned">Impact $/mo</th>
            <th class="p-2 text-right text-xs uppercase tracking-wide text-toned">Effort</th>
            <th class="p-2 text-right text-xs uppercase tracking-wide text-toned">RICE</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(r, i) in rows"
            :key="i"
            class="border-b odd:bg-muted/40 hover:bg-elevated transition-colors"
          >
            <td class="p-2">{{ r['Area'] }}</td>
            <td class="p-2">{{ r['Workflow'] }}</td>
            <td class="p-2 text-right">
              <UInput size="xs" v-model="r['Volume/week']" type="number" @change="compute(r)" />
            </td>
            <td class="p-2 text-right">
              <UInput
                size="xs"
                v-model="r['Avg minutes/task']"
                type="number"
                @change="compute(r)"
              />
            </td>
            <td class="p-2 text-right">
              <UInput size="xs" v-model="r['Loaded $/hr']" type="number" @change="compute(r)" />
            </td>
            <td class="p-2 text-right">
              <UInput
                size="xs"
                v-model="r['Delta defects/month']"
                type="number"
                @change="compute(r)"
              />
            </td>
            <td class="p-2 text-right">
              <UInput size="xs" v-model="r['$ per defect']" type="number" @change="compute(r)" />
            </td>
            <td class="p-2 text-right">
              <UInput
                size="xs"
                v-model="r['Cycle days saved']"
                type="number"
                @change="compute(r)"
              />
            </td>
            <td class="p-2 text-right">
              <UInput size="xs" v-model="r['$ per day']" type="number" @change="compute(r)" />
            </td>
            <td class="p-2 text-right tabular-nums">
              {{ r['Impact $/mo']?.toLocaleString?.() ?? '-' }}
            </td>
            <td class="p-2 text-right tabular-nums">{{ r['Effort score'] ?? '-' }}</td>
            <td class="p-2 text-right tabular-nums">
              <UBadge color="primary" variant="soft">{{ r['RICE score'] ?? '-' }}</UBadge>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
