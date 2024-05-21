<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import { useUid } from '@/composables/useUid'

interface IProps {
  label?: string
  required?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  label: '',
  required: false
})

const modelValue = defineModel<String | Number>()
const errorMessage = ref('')
const uid = useUid()

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
  <label v-if="label" :for="uid">
    {{ label }}
    <span v-if="required" class="p-error"> *</span>
  </label>
  <InputText
    v-bind="$attrs"
    v-model="modelValue"
    :id="uid"
    :aria-labelledby="errorMessage ? `${uid}-error` : undefined"
    :aria-invalid="!!errorMessage"
  />
  <small class="p-error" v-if="errorMessage" :id="`${uid}-error`" aria-live="assertive">
    {{ errorMessage }}
  </small>
</template>
