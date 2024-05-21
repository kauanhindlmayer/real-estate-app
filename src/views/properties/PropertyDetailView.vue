<script setup lang="ts">
import type PropertyGateway from '@/gateways/PropertyGateway'
import { inject, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLoadingStore } from '@/stores/loadingStore'
import Property from '@/types/models/Property'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import useBaseToast from '@/composables/useBaseToast'

const propertyGateway = inject<PropertyGateway>('propertyGateway')

const toast = useBaseToast()
const route = useRoute()
const loadingStore = useLoadingStore()

const property = ref<Property>(new Property())

async function fetchProperty(propertyId: string) {
  loadingStore.startLoading()
  try {
    property.value = await propertyGateway.getById(propertyId)
  } catch {
    toast.error({ message: 'Error fetching property' })
  } finally {
    loadingStore.stopLoading()
  }
}

onBeforeMount(() => {
  fetchProperty(route.params.id)
})
</script>

<template>
  <PropertyCard :property hide-footer v-if="property.id" />
  <div v-else class="property-not-found-wrapper">Property not found</div>
</template>

<style scoped>
.property-not-found-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}
</style>
