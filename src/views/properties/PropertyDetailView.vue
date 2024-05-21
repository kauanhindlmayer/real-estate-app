<script setup lang="ts">
import { inject, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLoadingStore } from '@/stores/loadingStore'
import useBaseToast from '@/composables/useBaseToast'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import type PropertyGateway from '@/gateways/PropertyGateway'
import Property from '@/types/models/Property'

const propertyGateway = inject('propertyGateway') as PropertyGateway

const toast = useBaseToast()
const route = useRoute()
const loadingStore = useLoadingStore()
const { t } = useI18n()

const property = ref<Property>(new Property())

async function fetchProperty(propertyId: string) {
  loadingStore.startLoading()
  try {
    property.value = await propertyGateway.getById(propertyId)
  } catch {
    toast.error({ message: t('properties.list.messages.errorFetchingProperty') })
  } finally {
    loadingStore.stopLoading()
  }
}

onBeforeMount(() => {
  fetchProperty(route.params.id as string)
})
</script>

<template>
  <PropertyCard :property hide-footer v-if="property.id" />
  <div v-else class="property-not-found-wrapper">{{ $t('properties.details.notFound') }}</div>
</template>

<style scoped>
.property-not-found-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}
</style>
