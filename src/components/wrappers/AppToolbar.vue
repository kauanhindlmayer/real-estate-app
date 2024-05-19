<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
</script>

<template>
  <Toolbar v-bind="$attrs">
    <template #start>
      <slot name="start" />
    </template>

    <template #center>
      <slot name="center" />
    </template>

    <template #end>
      <slot name="end" />
    </template>
  </Toolbar>
</template>
