<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import Property from '@/types/models/Property'
import PropertyCard from '@/views/Properties/partials/PropertyCard.vue'
import PropertyGateway from '@/gateways/PropertyGateway'
import Button from 'primevue/button'
import { useLoadingStore } from '@/stores/LoadingStore'
import { useRouter } from 'vue-router'

const loadingStore = useLoadingStore()
const router = useRouter()

const properties = ref<Property[]>([])

const fetchProperties = async () => {
  loadingStore.startLoading()
  try {
    properties.value = await PropertyGateway.getAll()
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.stopLoading()
  }
}

const goToPropertyCreate = () => {
  router.push({ path: '/properties/new' })
}

onBeforeMount(async () => {
  await fetchProperties()
})
</script>

<template>
  <div class="container">
    <div class="container__heading">
      <div>
        <h1>Properties</h1>
        <p>{{ properties.length }} properties</p>
      </div>
      <Button @click="goToPropertyCreate">New Property</Button>
    </div>
    <div class="property-cards-container">
      <div v-for="property in properties" :key="property.id">
        <PropertyCard :property="property" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container__heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.property-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
