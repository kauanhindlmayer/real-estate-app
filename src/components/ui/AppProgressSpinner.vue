<script lang="ts" setup>
import { computed } from 'vue'
import { useLoadingStore } from '@/stores/LoadingStore'
import ProgressSpinner from 'primevue/progressspinner'

const loadingStore = useLoadingStore()

const isLoading = computed(() => loadingStore.isLoading)
</script>

<template>
  <div v-if="isLoading" id="progress-spinner-container">
    <ProgressSpinner
      class="progress-spinner-container__spinner"
      stroke-width="4"
      animation-duration=".9s"
    />
  </div>
</template>

<style scoped>
#progress-spinner-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  background: rgb(0 0 0 / 14%);
  z-index: 10;
}
.progress-spinner-container__spinner {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -25px;
  margin-left: -25px;
}
</style>
