<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import Property from '@/types/models/Property'
import PropertyCard from '@/components/PropertyCard.vue'
import PropertyGateway from '@/gateways/PropertyGateway'
import { useLoadingStore } from '@/stores/LoadingStore'

const loadingStore = useLoadingStore()

const properties = ref<Property[]>([])

const fetchProperties = async () => {
  loadingStore.startLoading()
  try {
    properties.value = await PropertyGateway.fetchProperties()
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.stopLoading()
  }
}

onBeforeMount(async () => {
  await fetchProperties()
})
</script>

<template>
  <div class="container">
    <h1>Properties</h1>
    <div class="property-cards-container">
      <div v-for="property in properties" :key="property.id">
        <PropertyCard :property="property" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
.property-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
