<script lang="ts" setup>
import AppCheckbox from '@/components/wrappers/AppCheckbox.vue'

interface IProps {
  name: string
  options: { label: string; value: string }[]
}

const props = defineProps<IProps>()

const modelValue = defineModel()
</script>

<template>
  <div v-for="(option, index) in options" :key="index" class="flex">
    <AppCheckbox
      v-model="modelValue"
      :name="props.name"
      :value="option.value"
      :inputId="option.value"
    />
    <label :for="option.value" class="ml-2">{{ option.label }}</label>
  </div>
</template>
