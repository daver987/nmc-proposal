<script setup lang="ts">
// Simple shared metrics using Nuxt useState
type Metrics = {
  labor?: number
  error?: number
  cycle?: number
  net?: number
}
const metrics = useState<Metrics>('metrics', () => ({}))
</script>

<template>
  <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
    <UCard>
      <div class="text-xs text-gray-500">Labor savings ($/mo)</div>
      <div class="text-2xl font-semibold">{{ (metrics.labor ?? 0).toLocaleString() }}</div>
    </UCard>
    <UCard>
      <div class="text-xs text-gray-500">Error avoidance ($/mo)</div>
      <div class="text-2xl font-semibold">{{ (metrics.error ?? 0).toLocaleString() }}</div>
    </UCard>
    <UCard>
      <div class="text-xs text-gray-500">Cycle-time value ($/mo)</div>
      <div class="text-2xl font-semibold">{{ (metrics.cycle ?? 0).toLocaleString() }}</div>
    </UCard>
    <UCard>
      <div class="text-xs text-gray-500">Net ROI ($/mo)</div>
      <div class="text-2xl font-semibold">{{ (metrics.net ?? 0).toLocaleString() }}</div>
    </UCard>
  </div>
</template>

