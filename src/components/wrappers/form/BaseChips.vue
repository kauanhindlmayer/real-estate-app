<script lang="ts" setup>
import Chips from 'primevue/chips'
import useUid from '@/composables/useUid'

defineProps<{ label?: string; error?: string }>()

const modelValue = defineModel<String[]>()
const uid = useUid()
</script>

<template>
  <div class="p-fluid">
    <label v-if="label" :for="uid">
      {{ label }}
    </label>
    <Chips
      v-bind="$attrs"
      v-model="modelValue"
      :id="uid"
      :aria-labelledby="error ? `${uid}-error` : undefined"
      :aria-invalid="!!error"
      :invalid="!!error"
      input-class="w-full"
    />
    <small class="p-error" v-if="error" :id="`${uid}-error`" aria-live="assertive">
      {{ error }}
    </small>
  </div>
</template>
