<script lang="ts" setup>
import InputNumber from 'primevue/inputnumber'
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, default: '' },
  required: { type: Boolean, default: false }
})

const modelValue = defineModel()
const errorMessage = ref('')

function isValid(): boolean {
  if (props.required && !modelValue.value) {
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
  <label :for="label">
    {{ label }}
    <span v-if="required" class="p-error"> *</span>
  </label>
  <InputNumber v-model="modelValue" v-bind="$attrs" :id="label" :placeholder="label" />
  <small class="p-error" v-if="errorMessage">{{ errorMessage }}</small>
</template>
