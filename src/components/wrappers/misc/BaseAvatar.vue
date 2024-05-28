<script lang="ts" setup>
import Avatar from 'primevue/avatar'
import { computed, toRefs } from 'vue'

interface IProps {
  image: string | undefined
  shape?: 'circle' | 'square'
}

const props = withDefaults(defineProps<IProps>(), {
  image: undefined,
  shape: 'circle'
})

const { image, shape } = toRefs(props)

const icon = computed(() => (image.value ? undefined : 'pi pi-user'))
</script>

<template>
  <Avatar v-bind="$attrs" :icon :shape />
</template>
