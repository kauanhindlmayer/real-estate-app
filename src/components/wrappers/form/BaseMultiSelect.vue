<script lang="ts" setup>
import MultiSelect from 'primevue/multiselect'
import { useUid } from '@/composables/useUid'

defineProps<{ label?: string; error?: string }>()

const modelValue = defineModel<string[]>()
const uid = useUid()
</script>

<template>
  <div class="field">
    <label v-if="label" :for="uid">
      {{ label }}
      <span v-if="required" class="p-error"> *</span>
    </label>
    <MultiSelect
      v-model="modelValue"
      v-bind="$attrs"
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
