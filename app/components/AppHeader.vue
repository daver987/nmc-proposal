<template>
  <header class="py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="font-semibold tracking-wide">NMC Proposal</span>
      </div>
      <nav class="flex items-center gap-3">
        <UButton variant="subtle" to="/">Overview</UButton>
        <UButton variant="subtle" to="/kpi">KPI Catalog</UButton>
        <UButton variant="subtle" to="/roi">ROI Calculator</UButton>
        <UButton variant="subtle" to="/hopper">Opportunity Hopper</UButton>
        <UButton variant="outline" color="primary" to="/demo">Demo</UButton>
      </nav>
    </div>
  </header>
</template>
