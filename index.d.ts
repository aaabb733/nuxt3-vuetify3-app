declare module '#app' {
  interface NuxtApp {
    $log (msg: any): void
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $log (msg: any): void
  }
}