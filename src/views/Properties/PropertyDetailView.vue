<script setup lang="ts">
import type PropertyGateway from '@/gateways/PropertyGateway'
import { inject, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoadingStore } from '@/stores/LoadingStore'
import Property from '@/types/models/Property'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'

const propertyGateway = inject('propertyGateway') as PropertyGateway

const router = useRouter()
const loadingStore = useLoadingStore()

const property = ref<Property>(new Property())

async function fetchProperty(propertyId: string) {
  loadingStore.startLoading()
  try {
    property.value = await propertyGateway.getById(propertyId)
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.stopLoading()
  }
}

onBeforeMount(() => {
  const propertyId = router.currentRoute.value.params.id as string
  fetchProperty(propertyId)
})
</script>

<template>
  <PropertyCard :property hide-footer />
</template>
