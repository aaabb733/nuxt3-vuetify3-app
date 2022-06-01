export default defineNuxtRouteMiddleware((to, from) => {
  // console.log('auth')
  if (useAuth().value === null) {
    return navigateTo('/')
  }
  watch(useAuth(), (user) => {
    if (user === null) {
      return navigateTo('/')
    }
  })
})