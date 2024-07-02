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
    <template #item="{ item }">
      <!-- TODO: Remove this when unsplash start working again -->
      <img src="@/assets/images/house.jpg" :alt="item.alt" class="image" />
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

<style>
.p-galleria .p-galleria-indicators .p-galleria-indicator button {
  height: 0.5rem !important;
  width: 0.5rem !important;
}
</style>
