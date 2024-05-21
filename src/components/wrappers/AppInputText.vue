<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import { useUUID } from '@/composables/useUUID'

const props = defineProps({
  label: { type: String, default: '' },
  required: { type: Boolean, default: false }
})

const modelValue = defineModel()
const error = ref('')
const { uuid } = useUUID()

function isValid(): boolean {
  if (props.required && !modelValue.value) {
    error.value = 'This field is required'
    return false
  }
  error.value = ''
  return true
}

defineExpose({
  isValid
})
</script>

<template>
  <label v-if="label" :for="uuid">
    {{ label }}
    <span v-if="required" class="p-error"> *</span>
  </label>
  <InputText
    v-model="modelValue"
    v-bind="$attrs"
    :id="uuid"
    :aria-labelledby="error ? `${uuid}-error` : undefined"
    :aria-invalid="!!error"
  />
  <small class="p-error" v-if="error" :id="`${uuid}-error`" aria-live="assertive">
    {{ error }}
  </small>
</template>
