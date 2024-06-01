<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePropertiesStore } from '@/stores/propertiesStore'
import { storeToRefs } from 'pinia'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import PropertyContactForm from '@/views/properties/partials/PropertyContactForm.vue'
import BaseTag from '@/components/wrappers/misc/BaseTag.vue'
import SellerCard from '@/views/properties/partials/SellerCard.vue'

const route = useRoute()
const router = useRouter()

const propertiesStore = usePropertiesStore()
const { property } = storeToRefs(propertiesStore)

onBeforeMount(async () => {
  await propertiesStore.getPropertyById(route.params.id as string)
  if (!property.value.id) {
    router.push({ name: 'not-found' })
  }
})
</script>

<template>
  <div class="container">
    <div class="flex flex-column gap-3">
      <PropertyCard :property show-extended-info />

      <BaseCard>
        <template #title> {{ $t('fields.amenities') }} </template>
        <template #content>
          <BaseTag
            v-for="amenity in property?.amenities"
            :key="amenity"
            :value="amenity"
            severity="secondary"
            class="mr-2"
          />
        </template>
      </BaseCard>

      <SellerCard :property />
    </div>

    <PropertyContactForm :property-price="property.price" />
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  padding-top: 1.5rem;
}
@media (max-width: 1300px) {
  .container {
    max-width: 900px;
    flex-direction: column;
  }
}
</style>
