<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import AppProgressSpinner from './components/ui/AppProgressSpinner.vue'
</script>

<template>
  <RouterView />
  <Toast />
  <AppProgressSpinner />
</template>
