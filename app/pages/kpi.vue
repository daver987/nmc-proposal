<script setup lang="ts">
import kpiHtml from '~/docs/reference/NMC_KPI_Catalog.html?raw'
import { useSanitizedHtml } from '~/app/composables/useSanitizedHtml'
const html = useSanitizedHtml(kpiHtml)

function printPage() {
  window.print()
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">KPI Catalog</h1>
      <div class="flex gap-2">
        <UButton icon="i-lucide-printer" variant="outline" @click="printPage">Print / Save PDF</UButton>
      </div>
    </div>
    <UCard>
      <div class="prose max-w-none" v-html="html" />
    </UCard>
  </div>
</template>

