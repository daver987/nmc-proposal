<template>
  <header class="py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="font-semibold tracking-wide">NMC Proposal</span>
      </div>
      <nav v-if="isUnlocked && !onEnter" class="flex items-center gap-2">
        <UButton size="sm" variant="subtle" to="/">Overview</UButton>
        <UButton size="sm" variant="subtle" to="/kpi">KPI Catalog</UButton>
        <UButton size="sm" variant="subtle" to="/roi">ROI Calculator</UButton>
        <UButton size="sm" variant="subtle" to="/hopper">Opportunity Hopper</UButton>
        <UButton size="sm" variant="outline" color="primary" to="/demo">Demo</UButton>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
const route = useRoute()
const access = useCookie('nmc_access')
const isUnlocked = computed(() => access.value === 'ok')
const onEnter = computed(() => route.path === '/enter')
</script>
