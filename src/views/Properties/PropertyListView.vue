<script lang="ts" setup>
import { computed, inject, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import Property from '@/types/models/Property'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import PropertyGateway from '@/gateways/PropertyGateway'
import { useLoadingStore } from '@/stores/LoadingStore'
import AppButton from '@/components/wrappers/AppButton.vue'

const propertyGateway = inject('propertyGateway') as PropertyGateway

const loadingStore = useLoadingStore()
const router = useRouter()

const properties = ref<Property[]>([])

const amountOfProperties = computed(() => {
  const amount = properties.value.length
  if (amount === 0) return 'No properties'
  return `${amount} ${amount === 1 ? 'property' : 'properties'}`
})

async function fetchProperties() {
  loadingStore.startLoading()
  try {
    properties.value = await propertyGateway.getAll()
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.stopLoading()
  }
}

function redirectToPropertyCreate() {
  router.push({ path: '/properties/create' })
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
        <p>{{ amountOfProperties }}</p>
      </div>
      <AppButton label="New Property" @click="redirectToPropertyCreate" />
    </div>
    <div class="property-cards-container">
      <div v-for="property in properties" :key="property.id">
        <PropertyCard :property />
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
