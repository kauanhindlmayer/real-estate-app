<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { usePropertiesStore } from '@/stores/propertiesStore'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'

const route = useRoute()
const propertiesStore = usePropertiesStore()

onBeforeMount(() => {
  propertiesStore.getPropertyById(route.params.id as string)
})
</script>

<template>
  <PropertyCard v-if="propertiesStore.property" :property="propertiesStore.property" hide-footer />
  <div v-else class="property-not-found-wrapper">{{ $t('properties.details.notFound') }}</div>
</template>

<style scoped>
.property-not-found-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}
</style>
