<script lang="ts" setup>
import Password from 'primevue/password'
import { useUid } from '@/composables/useUid'

defineProps<{ label?: string; error?: string }>()

const modelValue = defineModel<String>()
const uid = useUid()
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
      :aria-labelledby="error ? `${uid}-error` : undefined"
      :aria-invalid="!!error"
      :invalid="!!error"
      inputClass="w-full"
    />
    <small class="p-error" v-if="error" :id="`${uid}-error`" aria-live="assertive">
      {{ error }}
    </small>
  </div>
</template>
