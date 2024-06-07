<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { usePropertiesStore } from '@/stores/properties'
import { storeToRefs } from 'pinia'
import PropertyCard from '@/components/properties/PropertyCard.vue'
import PropertyContactForm from '@/components/properties/PropertyContactForm.vue'
import SellerCard from '@/components/properties/SellerCard.vue'
import BaseTag from '@/components/wrappers/misc/BaseTag.vue'

const route = useRoute()

const propertiesStore = usePropertiesStore()
const { property, isLoading } = storeToRefs(propertiesStore)

onBeforeMount(async () => {
  await propertiesStore.getPropertyById(route.params.id as string)
})
</script>

<template>
  <div v-if="property" class="container">
    <div class="container__property-details">
      <PropertyCard :property show-extended-info />

      <BaseCard v-if="property?.amenities">
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

      <SellerCard v-if="property?.seller" :seller="property.seller" />
    </div>

    <PropertyContactForm :property-price="property?.price" />
  </div>
  <div v-if="isLoading">
    <div class="container">
      <div class="container__property-details">
        <BaseSkeleton width="55rem" height="29rem" borderRadius="8px" />
        <BaseSkeleton width="55rem" height="7rem" borderRadius="8px" />
        <BaseSkeleton width="55rem" height="9rem" borderRadius="8px" />
      </div>
      <BaseSkeleton width="28rem" height="37rem" borderRadius="8px" />
    </div>
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
.container__property-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
@media (max-width: 1300px) {
  .container {
    max-width: 900px;
    flex-direction: column;
  }
}
</style>
