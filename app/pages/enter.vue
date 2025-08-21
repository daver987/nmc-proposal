<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const form = reactive({ passcode: '' })
const { public: pub } = useRuntimeConfig()
const toast = useToast()
const cookie = useCookie('nmc_access', { sameSite: 'lax', path: '/' })
const inputRef = ref<any>(null)

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
      description: 'Please try again.',
      icon: 'i-lucide-shield-x',
      color: 'error',
      duration: 0,
      orientation: 'vertical',
      ui: {
        root: 'relative bg-error/5 ring-error before:content-[""] before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:bg-error',
      },
      actions: [
        {
          icon: 'i-lucide-eraser',
          label: 'Clear',
          color: 'neutral',
          variant: 'outline',
          onClick: (e?: Event) => {
            e?.stopPropagation?.()
            form.passcode = ''
            // focus back to input
            queueMicrotask(() => inputRef.value?.focus?.())
          },
        },
      ],
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
          <UInput
            ref="inputRef"
            v-model="form.passcode"
            type="password"
            autocomplete="off"
            size="lg"
          />
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
