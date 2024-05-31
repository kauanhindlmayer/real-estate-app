<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePropertiesStore } from '@/stores/propertiesStore'
import { storeToRefs } from 'pinia'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import PropertyContactForm from '@/views/properties/partials/PropertyContactForm.vue'

const route = useRoute()
const router = useRouter()
const propertiesStore = usePropertiesStore()

const { property } = storeToRefs(propertiesStore)

onBeforeMount(async () => {
  await propertiesStore.getPropertyById(route.params.id as string)
  if (!property.value) {
    router.push({ name: 'not-found' })
  }
})
</script>

<template>
  <div v-if="property" class="container flex gap-3 pt-4">
    <PropertyCard :property show-extended-info class="w-12" />
    <PropertyContactForm :property />
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
