<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const passInput = ref('')
const { public: pub } = useRuntimeConfig()
const cookie = useCookie('nmc_access', { sameSite: 'lax' })

function submit() {
  if (passInput.value && passInput.value === pub.passcode) {
    cookie.value = 'ok'
    const next = (route.query.next as string) || '/'
    router.push(next)
  } else {
    // lightweight toast via alert for now; can swap to Nuxt UI toast when needed
    alert('Incorrect passcode')
  }
}
</script>

<template>
  <div class="flex items-center justify-center py-20">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-lg font-semibold">Enter Access Passcode</div>
      </template>
      <UForm @submit.prevent="submit">
        <UFormField label="Passcode" name="passcode">
          <UInput v-model="passInput" type="password" autocomplete="off" size="lg" />
        </UFormField>
        <div class="mt-4 flex justify-end">
          <UButton type="submit" color="primary">Continue</UButton>
        </div>
      </UForm>
      <template #footer>
        <span class="text-xs text-muted">Protected content requires a one-time passcode.</span>
      </template>
    </UCard>
  </div>
</template>
