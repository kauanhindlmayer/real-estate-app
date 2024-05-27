<script lang="ts" setup>
import Password from 'primevue/password'
import { ref } from 'vue'
import { useUid } from '@/composables/useUid'

interface IProps {
  label?: string
  required?: boolean
  password?: string
}

const props = withDefaults(defineProps<IProps>(), {
  label: '',
  required: false,
  password: ''
})

const modelValue = defineModel<String>()
const errorMessage = ref('')
const uid = useUid()

function isValid(): boolean {
  if (props.required && !modelValue.value) {
    errorMessage.value = 'This field is required'
    return false
  }
  if (props.password && modelValue.value !== props.password) {
    errorMessage.value = 'Passwords do not match'
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
  <div>
    <label v-if="label" :for="uid">
      {{ label }}
      <span v-if="required" class="p-error"> *</span>
    </label>
    <Password
      v-bind="$attrs"
      v-model="modelValue"
      :id="uid"
      :aria-labelledby="errorMessage ? `${uid}-error` : undefined"
      :aria-invalid="!!errorMessage"
      inputClass="w-full"
    />
    <small class="p-error" v-if="errorMessage" :id="`${uid}-error`" aria-live="assertive">
      {{ errorMessage }}
    </small>
  </div>
</template>
