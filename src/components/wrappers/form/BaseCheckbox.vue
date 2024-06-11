<script lang="ts" setup>
import Checkbox from 'primevue/checkbox'
import useUid from '@/composables/useUid'

defineProps<{ label?: string; error?: string }>()

const modelValue = defineModel<boolean | string[]>()

const uid = useUid()
</script>

<template>
  <div>
    <div class="flex align-items-center gap-2">
      <Checkbox
        v-bind="$attrs"
        v-model="modelValue"
        :inputId="uid"
        :aria-labelledby="error ? `${uid}-error` : undefined"
        :aria-invalid="!!error"
        :invalid="!!error"
      />
      <label v-if="label" :for="uid">{{ label }}</label>
    </div>
    <small class="p-error" v-if="error" :id="`${uid}-error`" aria-live="assertive">
      {{ error }}
    </small>
  </div>
</template>
