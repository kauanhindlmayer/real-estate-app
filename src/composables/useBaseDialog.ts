import { ref } from 'vue'

export default function useBaseDialog() {
  const isVisible = ref(false)

  function openDialog() {
    isVisible.value = true
  }

  function closeDialog() {
    isVisible.value = false
  }

  return {
    isVisible,
    openDialog,
    closeDialog
  }
}
