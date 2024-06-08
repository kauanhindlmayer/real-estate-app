<script setup lang="ts">
import { onBeforeMount } from 'vue'
import useTheme from '@/composables/useTheme'
import BaseToast from '@/components/wrappers/misc/BaseToast.vue'

const { setTheme } = useTheme()

onBeforeMount(() => setTheme())
</script>

<template>
  <RouterView />
  <BaseToast />
</template>
