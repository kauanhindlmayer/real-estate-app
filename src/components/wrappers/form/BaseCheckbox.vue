<script lang="ts" setup>
import Checkbox from 'primevue/checkbox'

const modelValue = defineModel<String>()
</script>

<template>
  <Checkbox v-bind="$attrs" v-model="modelValue" />
</template>
