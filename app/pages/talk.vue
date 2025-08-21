<script setup lang="ts">
const lines = [
  'You asked how I decide where AI should go. I don’t start with tools; I start with unit economics. We inventory workflows, measure minutes/defects/cycle time, and quantify dollar impact.',
  'We rank opportunities with RICE: Reach×Impact×Confidence/Effort. Confidence comes from your baselines, not my guesses.',
  'Two pilots in 30–45 days. Each gets acceptance criteria: a specific minutes‑per‑task reduction with 95% confidence, non‑worse defect rate, and a target adoption count in the cohort.',
  'Architecture is boring by design: ChatGPT Enterprise connectors + Deep Research for knowledge work; MCP only when we must. No rip‑and‑replace; we avoid vendor politics.',
  'You’ll see numbers weekly: opportunity hopper with $ impact, pilot scorecards, and an adoption dashboard. If the numbers don’t clear the gate, we kill it and pick the next one.',
]
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-xl font-semibold">Talk Track</h1>
    <UCard>
      <template #header> Five key bullets for the conversation </template>
      <div>
        <CopyLine v-for="(text, i) in lines" :key="i" :text="text" />
      </div>
    </UCard>
    <UAlert
      color="warning"
      title="Note"
      description="Email/snippets in docs are for context only and are not surfaced here."
    />
  </div>
</template>
