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
  <div class="pt-4">
    <div v-if="propertiesStore.property" class="property-wrBaseer">
      <PropertyCard :property="propertiesStore.property" hide-footer />
    </div>
    <div v-else class="property-not-found-wrBaseer">{{ $t('properties.propertyNotFound') }}</div>
  </div>
</template>

<style scoped>
.property-wrBaseer {
  max-width: 800px;
  margin: 0 auto;
}
.property-not-found-wrBaseer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}
</style>
