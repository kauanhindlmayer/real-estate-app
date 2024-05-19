<script lang="ts" setup>
import Password from 'primevue/password'
import { ref } from 'vue'

const props = defineProps({
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
  <label for="password">Password</label>
  <Password v-model="modelValue" v-bind="$attrs" id="password" placeholder="Password" />
  <small class="p-error" v-if="errorMessage">{{ errorMessage }}</small>
</template>
