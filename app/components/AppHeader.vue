<script setup lang="ts">
const route = useRoute()
const access = useCookie('nmc_access')
const isUnlocked = computed(() => access.value === 'ok')
const onEnter = computed(() => route.path === '/enter')
</script>

<template>
  <header class="py-4 border-b border-gray-500/20">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="font-bold text-xl tracking-wide">NMC Proposal</span>
      </div>
      <nav v-if="isUnlocked && !onEnter" class="flex items-center gap-2">
        <UButton
          size="sm"
          variant="subtle"
          to="/"
          class="transition-transform hover:-translate-y-0.5"
          >Overview</UButton
        >
        <UButton
          size="sm"
          variant="subtle"
          to="/kpi"
          class="transition-transform hover:-translate-y-0.5"
          >KPI Catalog</UButton
        >
        <UButton
          size="sm"
          variant="subtle"
          to="/roi"
          class="transition-transform hover:-translate-y-0.5"
          >ROI Calculator</UButton
        >
        <UButton
          size="sm"
          variant="subtle"
          to="/hopper"
          class="transition-transform hover:-translate-y-0.5"
          >Opportunity Hopper</UButton
        >
        <UButton
          size="sm"
          variant="outline"
          color="primary"
          to="/demo"
          class="transition-transform hover:-translate-y-0.5"
          >Demo</UButton
        >
      </nav>
    </div>
  </header>
</template>
