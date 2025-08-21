export default defineNuxtRouteMiddleware((to) => {
  const { public: pub } = useRuntimeConfig()
  // If no passcode is configured, do not gate (dev convenience)
  if (!pub.passcode) return

  // Public routes that don't require the cookie
  const publicRoutes = new Set(['/enter'])
  if (publicRoutes.has(to.path)) return

  const cookie = useCookie('nmc_access')
  if (cookie.value !== 'ok') {
    const next = encodeURIComponent(to.fullPath)
    return navigateTo(`/enter?next=${next}`)
  }
})
