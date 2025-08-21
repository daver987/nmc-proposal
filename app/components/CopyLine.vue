<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{ text: string }>()
const { copy, copied } = useClipboard({ source: () => props.text })
</script>

<template>
  <div class="flex items-start gap-2 py-2">
    <UButton icon="i-lucide-copy" size="xs" variant="soft" @click="copy()">
      {{ copied ? 'Copied' : 'Copy' }}
    </UButton>
    <p class="leading-relaxed">{{ text }}</p>
  </div>
</template>

