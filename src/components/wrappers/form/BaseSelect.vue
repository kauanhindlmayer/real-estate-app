<script lang="ts" setup>
import Select from 'primevue/select'
import useUid from '@/composables/useUid'

defineProps<{ label?: string; error?: string }>()

const modelValue = defineModel<String | Number>()
const uid = useUid()
</script>

<template>
  <div>
    <label v-if="label" :for="uid">
      {{ label }}
    </label>
    <Select
      v-bind="$attrs"
      v-model="modelValue"
      :id="uid"
      :aria-labelledby="error ? `${uid}-error` : undefined"
      :aria-invalid="!!error"
      :invalid="!!error"
      class="w-full"
    >
      <template #option="{ option }">
        <slot name="option" :option="option" />
      </template>
      <template #value="{ value, placeholder }">
        <slot name="value" :value="value" :placeholder="placeholder" />
      </template>
    </Select>
    <small class="p-error" v-if="error" :id="`${uid}-error`" aria-live="assertive">
      {{ error }}
    </small>
  </div>
</template>
