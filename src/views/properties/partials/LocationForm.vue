<script setup lang="ts">
import { inject, ref } from 'vue'
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
  if (!validateFields()) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields' })
    return
  }
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

const zipCodeRef = ref<InstanceType<typeof AppInputText> | null>(null)
const addressRef = ref<InstanceType<typeof AppInputText> | null>(null)
const cityRef = ref<InstanceType<typeof AppInputText> | null>(null)
const stateRef = ref<InstanceType<typeof AppInputText> | null>(null)

function validateFields() {
  const fieldsToValidate = [zipCodeRef, addressRef, cityRef, stateRef]
  const validationResults = fieldsToValidate.map((ref) => ref.value?.isValid())
  return validationResults.every((valid) => valid)
}

const emit = defineEmits(['previous'])

function previous() {
  emit('previous')
}
</script>

<template>
  <div class="p-fluid">
    <div class="p-field">
      <AppInputText
        ref="zipCodeRef"
        v-model="property.location.zipCode"
        label="Zip Code"
        required
        @change="getLocationByZipCode"
      />
    </div>

    <div class="p-field">
      <AppInputText ref="addressRef" v-model="property.location.address" label="Address" required />
    </div>

    <div class="p-field">
      <AppInputText ref="cityRef" v-model="property.location.city" label="City" required />
    </div>

    <div class="p-field">
      <AppInputText ref="stateRef" v-model="property.location.state" label="State" required />
    </div>

    <div class="p-field">
      <AppInputText ref="countryRef" v-model="property.location.country" label="Country" required />
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
