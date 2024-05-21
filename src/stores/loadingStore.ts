import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loadingStore', () => {
  const isLoading = ref(false)

  const startLoading = () => {
    isLoading.value = true
  }
  const stopLoading = () => {
    isLoading.value = false
  }

  return {
    isLoading,
    startLoading,
    stopLoading
  }
})
