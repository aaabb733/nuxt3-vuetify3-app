import { initPosts } from "~~/posts"

export default defineNuxtPlugin(nuxtApp => {
  console.log('postsinit')
  initPosts()
})