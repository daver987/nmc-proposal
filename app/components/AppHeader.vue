<template>
  <header class="py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <UIcon name="i-logos:vue" class="text-xl" />
        <span class="font-semibold">NMC Proposal</span>
      </div>
      <nav class="flex items-center gap-3">
        <UButton variant="ghost" to="/">Overview</UButton>
        <UButton variant="ghost" to="/kpi">KPI Catalog</UButton>
        <UButton variant="ghost" to="/roi">ROI Calculator</UButton>
        <UButton variant="ghost" to="/hopper">Opportunity Hopper</UButton>
        <UButton variant="ghost" to="/talk">Talk Track</UButton>
        <UButton variant="soft" color="primary" to="/demo">Demo</UButton>
      </nav>
    </div>
  </header>
</template>
