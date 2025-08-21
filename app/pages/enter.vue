<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const form = reactive({ passcode: '' })
const { public: pub } = useRuntimeConfig()
const toast = useToast()
const cookie = useCookie('nmc_access', { sameSite: 'lax', path: '/' })

function normalizeNext(n?: string) {
  if (!n) return '/'
  let out = n
  try {
    out = decodeURIComponent(n)
  } catch (e) {}
  if (!out.startsWith('/')) return '/'
  return out
}

function submit() {
  if (form.passcode && form.passcode === pub.passcode) {
    cookie.value = 'ok'
    const next = normalizeNext(route.query.next as string)
    router.push(next)
  } else {
    toast.add({
      title: 'Invalid passcode',
      description: 'Please try again or contact the presenter.',
      color: 'error',
      duration: 3000,
    })
  }
}
</script>

<template>
  <div class="flex items-center justify-center py-20">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-lg font-semibold">Enter Access Passcode</div>
      </template>
      <UForm :state="form" @submit.prevent="submit">
        <UFormField label="Passcode" name="passcode">
          <UInput v-model="form.passcode" type="password" autocomplete="off" size="lg" />
        </UFormField>
        <div class="mt-4 flex justify-end">
          <UButton type="submit" color="primary">Continue</UButton>
        </div>
      </UForm>
      <template #footer>
        <span class="text-xs text-muted">Protected content requires a one-time passcode.</span>
        <span v-if="!pub.passcode" class="ml-2 text-xs text-toned"
          >Passcode not set — dev mode allows access.</span
        >
      </template>
    </UCard>
  </div>
</template>
