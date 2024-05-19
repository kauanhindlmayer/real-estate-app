<script setup lang="ts">
import { inject } from 'vue'
import { useLoadingStore } from '@/stores/loadingStore'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import LocationGateway from '@/gateways/LocationGateway'
import Property from '@/types/models/Property'
import type PropertyGateway from '@/gateways/PropertyGateway'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const propertyGateway = inject('propertyGateway') as PropertyGateway
const locationGateway = inject('locationGateway') as LocationGateway

const toast = useToast()
const router = useRouter()
const loadingStore = useLoadingStore()

const property = defineModel<Property>({ default: () => new Property() })

async function getLocationByZipCode() {
  loadingStore.startLoading()
  try {
    const { zipCode } = property.value.location
    property.value.location = await locationGateway.getByZipCode(zipCode)
    toast.add({ severity: 'success', summary: 'Success', detail: 'Location found' })
  } catch {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Location not found' })
  } finally {
    loadingStore.stopLoading()
  }
}

async function saveProperty() {
  loadingStore.startLoading()
  try {
    await propertyGateway.save(property.value)
    toast.add({ severity: 'success', summary: 'Success', detail: 'Property saved' })
    router.push({ path: '/properties' })
  } catch {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Property not saved' })
  } finally {
    loadingStore.stopLoading()
  }
}

const emit = defineEmits(['previous'])

function previous() {
  emit('previous')
}
</script>

<template>
  <div class="p-fluid">
    <div class="p-field">
      <label for="zipCode">Zip Code</label>
      <AppInputText
        v-model="property.location.zipCode"
        placeholder="Zip Code"
        id="zipCode"
        @change="getLocationByZipCode"
      />
    </div>

    <div class="p-field">
      <label for="address">Address</label>
      <AppInputText v-model="property.location.address" placeholder="Address" id="address" />
    </div>

    <div class="p-field">
      <label for="city">City</label>
      <AppInputText v-model="property.location.city" placeholder="City" id="city" />
    </div>

    <div class="p-field">
      <label for="state">State</label>
      <AppInputText v-model="property.location.state" placeholder="State" id="state" />
    </div>

    <div class="p-field">
      <label for="country">Country</label>
      <AppInputText v-model="property.location.country" placeholder="Country" id="country" />
    </div>

    <footer>
      <AppButton label="Previous" icon="pi pi-arrow-left" class="w-2 mt-4" @click="previous" />
      <AppButton label="Save" icon="pi pi-check" class="w-2 mt-4" @click="saveProperty" />
    </footer>
  </div>
</template>

<style scoped>
.p-field {
  margin-bottom: 10px;
}
footer {
  display: flex;
  justify-content: space-between;
}
</style>
