<script setup lang="ts">
import IconField from 'primevue/iconfield'
</script>

<template>
  <IconField v-bind="$attrs">
    <slot />
  </IconField>
</template>
