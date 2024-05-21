<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import { useUid } from '@/composables/useUid'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  required: { type: Boolean, default: false }
})

const error = ref('')
const uid = useUid()

function isValid(): boolean {
  if (props.required && !props.modelValue) {
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
  <label v-if="label" :for="uid">
    {{ label }}
    <span v-if="required" class="p-error"> *</span>
  </label>
  <InputText
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :id="uid"
    :aria-labelledby="error ? `${uid}-error` : undefined"
    :aria-invalid="!!error"
  />
  <small class="p-error" v-if="error" :id="`${uid}-error`" aria-live="assertive">
    {{ error }}
  </small>
</template>
