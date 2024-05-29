<script lang="ts" setup>
import InputNumber from 'primevue/inputnumber'
import { useUid } from '@/composables/useUid'

defineProps<{ label?: string; error?: string }>()

const modelValue = defineModel<String | Number>()
const uid = useUid()
</script>

<template>
  <div class="field">
    <label v-if="label" :for="uid">
      {{ label }}
      <span v-if="required" class="p-error"> *</span>
    </label>
    <InputNumber
      v-bind="$attrs"
      v-model="modelValue"
      :id="uid"
      :aria-labelledby="error ? `${uid}-error` : undefined"
      :aria-invalid="!!error"
      :invalid="!!error"
      class="w-full"
    />
    <small class="p-error" v-if="error" :id="`${uid}-error`" aria-live="assertive">
      {{ error }}
    </small>
  </div>
</template>
