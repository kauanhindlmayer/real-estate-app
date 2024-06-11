<script lang="ts" setup>
import Textarea from 'primevue/textarea'
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
    <Textarea
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
