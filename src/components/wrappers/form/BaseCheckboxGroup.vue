<script lang="ts" setup>
import BaseCheckbox from '@/components/wrappers/form/BaseCheckbox.vue'

interface IProps {
  name: string
  options: { label: string; value: string }[]
}

const props = defineProps<IProps>()

const modelValue = defineModel()
</script>

<template>
  <div v-for="(option, index) in options" :key="index">
    <BaseCheckbox
      v-model="modelValue"
      :name="props.name"
      :label="option.label"
      :value="option.value"
    />
  </div>
</template>
