<script lang="ts" setup>
import Galleria from 'primevue/galleria'
import { computed } from 'vue'

interface IProps {
  images: string[]
}

const props = defineProps<IProps>()

const value = computed(() => {
  return props.images.map((image: string, index: number) => {
    return {
      itemImageSrc: image,
      thumbnailImageSrc: image,
      alt: `Image ${index + 1}`
    }
  })
})
</script>

<template>
  <Galleria v-bind="$attrs" :value>
    <template #item="slotProps">
      <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" class="image" />
    </template>
  </Galleria>
</template>

<style scoped>
.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}
</style>
