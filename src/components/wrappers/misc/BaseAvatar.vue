<script lang="ts" setup>
import Avatar from 'primevue/avatar'

interface IProps {
  image: string | undefined
  shape?: 'circle' | 'square'
}

const props = withDefaults(defineProps<IProps>(), {
  image: undefined,
  shape: 'circle'
})
</script>

<template>
  <Avatar
    v-bind="$attrs"
    :image="props.image"
    :icon="props.image ? undefined : 'pi pi-user'"
    :shape="props.shape"
  />
</template>
