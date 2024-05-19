<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, default: '' },
  noLabel: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  modelValue: { type: String, default: '' }
})

const errorMessage = ref('')

function isValid(): boolean {
  if (props.required && !props.modelValue) {
    errorMessage.value = 'This field is required'
    return false
  }
  errorMessage.value = ''
  return true
}

defineExpose({
  isValid
})
</script>

<template>
  <label v-if="!noLabel" :for="label">
    {{ label }}
    <span v-if="required" class="p-error"> *</span>
  </label>
  <InputText v-bind="$attrs" :id="label" :placeholder="label" />
  <small class="p-error" v-if="errorMessage">{{ errorMessage }}</small>
</template>
