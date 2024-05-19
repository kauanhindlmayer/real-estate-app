<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppToast from '@/components/wrappers/AppToast.vue'
import AppProgressSpinner from '@/components/wrappers/AppProgressSpinner.vue'
</script>

<template>
  <RouterView />
  <AppToast />
  <AppProgressSpinner />
</template>
