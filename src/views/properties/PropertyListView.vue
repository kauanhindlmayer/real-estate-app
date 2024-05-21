<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { usePropertiesStore } from '@/stores/propertiesStore'
import AppButton from '@/components/wrappers/AppButton.vue'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'

const router = useRouter()
const propertiesStore = usePropertiesStore()

function redirectToPropertyCreate() {
  router.push({ name: 'property-create' })
}

onBeforeMount(async () => {
  await propertiesStore.getAllProperties()
})
</script>

<template>
  <header>
    <div>
      <h1>{{ $t('properties.list.title') }}</h1>
      <p>{{ $t('properties.list.description', { count: propertiesStore.properties.length }) }}</p>
    </div>
    <AppButton
      :label="$t('properties.list.buttons.createProperty')"
      @click="redirectToPropertyCreate"
    />
  </header>
  <main class="property-cards-container">
    <PropertyCard v-for="property in propertiesStore.properties" :key="property.id" :property />
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
