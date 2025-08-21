<script setup lang="ts">
import { Bar } from 'vue-chart-3'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { useStorage } from '@vueuse/core'

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

type RoiInputs = {
  minutesSavedPerTask: number
  tasksPerMonth: number
  loadedRatePerHour: number
  baselineDefects: number
  postDefects: number
  dollarsPerDefect: number
  cycleDaysSaved: number
  dollarsPerDay: number
  monthlyCost: number
}

const inputs = useStorage<RoiInputs>('roi-inputs', {
  minutesSavedPerTask: 5,
  tasksPerMonth: 400,
  loadedRatePerHour: 95,
  baselineDefects: 40,
  postDefects: 28,
  dollarsPerDefect: 120,
  cycleDaysSaved: 1,
  dollarsPerDay: 1000,
  monthlyCost: 4000,
})

const labor = computed(() =>
  Math.max(
    0,
    (inputs.value.minutesSavedPerTask / 60) *
      inputs.value.tasksPerMonth *
      inputs.value.loadedRatePerHour
  )
)
const errorAvoid = computed(() =>
  Math.max(
    0,
    (inputs.value.baselineDefects - inputs.value.postDefects) * inputs.value.dollarsPerDefect
  )
)
const cycleVal = computed(() =>
  Math.max(0, inputs.value.cycleDaysSaved * inputs.value.dollarsPerDay)
)
const net = computed(() =>
  Math.round(labor.value + errorAvoid.value + cycleVal.value - inputs.value.monthlyCost)
)

// Update shared metrics
const metrics = useState('metrics', () => ({}) as any)
watchEffect(() => {
  metrics.value = {
    labor: Math.round(labor.value),
    error: Math.round(errorAvoid.value),
    cycle: Math.round(cycleVal.value),
    net: Math.round(net.value),
  }
})

const chartData = computed(() => ({
  labels: ['Labor', 'Error', 'Cycle', 'Net'],
  datasets: [
    {
      label: 'Value ($/mo)',
      backgroundColor: ['#f59e0b', '#a3e635', '#60a5fa', '#10b981'],
      data: [
        Math.round(labor.value),
        Math.round(errorAvoid.value),
        Math.round(cycleVal.value),
        Math.round(net.value),
      ],
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { y: { ticks: { callback: (v: any) => `$${Number(v).toLocaleString()}` } } },
}
</script>

<template>
  <UCard>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="space-y-3 md:col-span-2">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <UFormField label="Minutes saved per task">
            <UInput v-model.number="inputs.minutesSavedPerTask" type="number" />
          </UFormField>
          <UFormField label="Tasks per month">
            <UInput v-model.number="inputs.tasksPerMonth" type="number" />
          </UFormField>
          <UFormField label="Loaded $/hour">
            <UInput v-model.number="inputs.loadedRatePerHour" type="number" />
          </UFormField>
          <UFormField label="Defects (baseline)">
            <UInput v-model.number="inputs.baselineDefects" type="number" />
          </UFormField>
          <UFormField label="Defects (post)">
            <UInput v-model.number="inputs.postDefects" type="number" />
          </UFormField>
          <UFormField label="$ per defect">
            <UInput v-model.number="inputs.dollarsPerDefect" type="number" />
          </UFormField>
          <UFormField label="Cycle time saved (days)">
            <UInput v-model.number="inputs.cycleDaysSaved" type="number" />
          </UFormField>
          <UFormField label="$ value per day">
            <UInput v-model.number="inputs.dollarsPerDay" type="number" />
          </UFormField>
          <UFormField label="Monthly tool + change + build cost ($)">
            <UInput v-model.number="inputs.monthlyCost" type="number" />
          </UFormField>
        </div>
        <MetricCards />
      </div>
      <div class="md:col-span-1">
        <div class="h-64">
          <Bar :chart-data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </UCard>
</template>
