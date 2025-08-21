<script setup lang="ts">
const toaster = { position: 'top-right', expand: true }
</script>

<template>
  <UApp :toaster="toaster">
    <UContainer class="min-h-screen flex flex-col">
      <AppHeader />
      <main class="flex-1 py-6">
        <NuxtPage />
      </main>
      <AppFooter />
    </UContainer>
    <NuxtRouteAnnouncer />
  </UApp>
</template>
