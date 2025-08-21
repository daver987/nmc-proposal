<script setup lang="ts">
import onePager from '~/docs/reference/NMC_Balanced_OnePager.html?raw'
import { useSanitizedHtml } from '~/app/composables/useSanitizedHtml'
const html = useSanitizedHtml(onePager)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Operational AI — Balanced Plan</h1>
        <p class="text-sm text-gray-500">Numbers-first narrative, quick wins, and adoption.</p>
      </div>
      <div class="flex gap-2">
        <UButton to="/roi" color="primary">ROI Calculator</UButton>
        <UButton to="/hopper" variant="outline">Opportunity Hopper</UButton>
        <UButton to="/kpi" variant="ghost">KPI Catalog</UButton>
        <UButton to="/talk" variant="ghost">Talk Track</UButton>
      </div>
    </div>

    <MetricCards />

    <UCard>
      <div class="prose max-w-none" v-html="html" />
    </UCard>
  </div>
</template>

