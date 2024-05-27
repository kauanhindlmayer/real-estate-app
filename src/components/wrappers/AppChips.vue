<script lang="ts" setup>
import Tag from 'primevue/tag'
import { computed } from 'vue'

interface IProps {
  limit: number
}

const props = defineProps<IProps>()

const chips = defineModel<string[]>({ default: [] })

const chipsList = computed(() => {
  if (props.limit && chips.value.length > props.limit) {
    const limitedChips = chips.value.slice(0, props.limit)
    limitedChips.push('...')
    return limitedChips
  }
  return chips.value
})
</script>

<template>
  <div class="chips-container">
    <Tag v-for="(chip, index) in chipsList" :key="index" :value="chip" severity="secondary" />
  </div>
</template>

<style scoped>
.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
