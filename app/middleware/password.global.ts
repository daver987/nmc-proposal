export default defineNuxtRouteMiddleware((to) => {
  // Public routes that don't require the cookie
  const publicRoutes = new Set(['/enter'])
  if (publicRoutes.has(to.path)) return

  const cookie = useCookie('nmc_access')
  if (cookie.value !== 'ok') {
    const next = encodeURIComponent(to.fullPath)
    return navigateTo(`/enter?next=${next}`)
  }
})

