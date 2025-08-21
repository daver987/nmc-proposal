<template>
  <UApp>
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
