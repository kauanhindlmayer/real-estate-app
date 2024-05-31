<script lang="ts" setup>
import Checkbox from 'primevue/checkbox'
import { useUid } from '@/composables/useUid'

defineProps<{ label?: string }>()

const modelValue = defineModel<boolean | string[]>()

const uid = useUid()
</script>

<template>
  <div class="flex align-items-center">
    <Checkbox v-bind="$attrs" v-model="modelValue" :inputId="uid" />
    <label v-if="label" :for="uid" class="ml-2">{{ label }}</label>
  </div>
</template>
