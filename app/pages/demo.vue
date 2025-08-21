<script setup lang="ts">
const { public: pub } = useRuntimeConfig()
const url = computed(() => pub.demoVideoUrl)
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-xl font-semibold">90‑second Demo</h1>
    <UCard>
      <template #header>
        Short walkthrough — retrieval, evaluation harness, DD triage, LP assist
      </template>
      <div class="aspect-video w-full">
        <iframe
          v-if="url"
          :src="url"
          class="h-full w-full rounded"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <div v-else class="flex h-full items-center justify-center text-gray-500">
          Set NUXT_PUBLIC_DEMO_VIDEO_URL to show the video.
        </div>
      </div>
    </UCard>
  </div>
</template>

