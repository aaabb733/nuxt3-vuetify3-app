export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      log: console.log
    }
  }
})