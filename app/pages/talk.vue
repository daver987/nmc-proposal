<script setup lang="ts">
import talk from '~/docs/reference/NMC_Redo_Talk_Track.txt?raw'
const lines = talk
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => /^\d+\)/.test(l))
  .map((l) => l.replace(/^\d+\)\s*/, ''))
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-xl font-semibold">Talk Track</h1>
    <UCard>
      <template #header>
        Five key bullets for the conversation
      </template>
      <div>
        <CopyLine v-for="(text, i) in lines" :key="i" :text="text" />
      </div>
    </UCard>
    <UAlert color="yellow" title="Note" description="Email/snippets in docs are for context only and are not surfaced here." />
  </div>
</template>

