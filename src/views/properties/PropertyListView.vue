<script lang="ts" setup>
import { inject, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '@/components/wrappers/AppButton.vue'
import Property from '@/types/models/Property'
import PropertyGateway from '@/gateways/PropertyGateway'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import { useLoadingStore } from '@/stores/loadingStore'
import pluralize from '@/utils/pluralize'
import useBaseToast from '@/composables/useBaseToast'

const propertyGateway = inject('propertyGateway') as PropertyGateway

const loadingStore = useLoadingStore()
const toast = useBaseToast()
const router = useRouter()

const properties = ref<Property[]>([])

async function fetchProperties() {
  loadingStore.startLoading()
  try {
    properties.value = await propertyGateway.getAll()
  } catch {
    toast.error({ message: 'Error fetching properties' })
  } finally {
    loadingStore.stopLoading()
  }
}

function redirectToPropertyCreate() {
  router.push({ name: 'property-create' })
}

onBeforeMount(async () => {
  await fetchProperties()
})
</script>

<template>
  <header>
    <div>
      <h1>Properties</h1>
      <p>{{ pluralize(properties.length, 'property', 'properties') }}</p>
    </div>
    <AppButton label="New Property" @click="redirectToPropertyCreate" />
  </header>
  <main class="property-cards-container">
    <PropertyCard v-for="property in properties" :key="property.id" :property />
  </main>
</template>

<style scoped>
header {
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
