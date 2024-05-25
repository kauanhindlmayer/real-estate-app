<script lang="ts" setup>
import Dropdown from 'primevue/dropdown'

const modelValue = defineModel()
</script>

<template>
  <Dropdown v-bind="$attrs" v-model="modelValue" />
</template>
