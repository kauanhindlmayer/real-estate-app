import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)

  function startLoading() {
    isLoading.value = true
  }
  function stopLoading() {
    isLoading.value = false
  }

  return {
    /* State */
    isLoading,
    /* Actions */
    startLoading,
    stopLoading
  }
})
