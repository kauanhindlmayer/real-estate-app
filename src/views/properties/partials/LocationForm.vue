<script setup lang="ts">
import { inject, ref } from 'vue'
import { useLoadingStore } from '@/stores/loadingStore'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import LocationGateway from '@/gateways/LocationGateway'
import Property from '@/types/models/Property'
import type PropertyGateway from '@/gateways/PropertyGateway'
import { useRouter } from 'vue-router'
import useBaseToast from '@/composables/useBaseToast'

const propertyGateway = inject('propertyGateway') as PropertyGateway
const locationGateway = inject('locationGateway') as LocationGateway

const toast = useBaseToast()
const router = useRouter()
const loadingStore = useLoadingStore()

const property = defineModel<Property>({ default: () => new Property() })

async function getLocationByZipCode() {
  loadingStore.startLoading()
  try {
    const { zipCode } = property.value.location
    property.value.location = await locationGateway.getByZipCode(zipCode)
    toast.success({ message: 'Location found' })
  } catch {
    toast.error({ message: 'Location not found' })
  } finally {
    loadingStore.stopLoading()
  }
}

async function saveProperty() {
  if (!validateFields()) {
    toast.error({ message: 'Please fill in all required fields' })
    return
  }
  loadingStore.startLoading()
  try {
    await propertyGateway.save(property.value)
    toast.success({ message: 'Property saved' })
    router.push({ name: 'properties' })
  } catch {
    toast.error({ message: 'Error saving property' })
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
        placeholder="Zip Code"
        required
        @change="getLocationByZipCode"
      />
    </div>

    <div class="p-field">
      <AppInputText
        ref="addressRef"
        v-model="property.location.address"
        label="Address"
        placeholder="Address"
        required
      />
    </div>

    <div class="p-field">
      <AppInputText
        ref="cityRef"
        v-model="property.location.city"
        label="City"
        placeholder="City"
        required
      />
    </div>

    <div class="p-field">
      <AppInputText
        ref="stateRef"
        v-model="property.location.state"
        label="State"
        placeholder="State"
        required
      />
    </div>

    <div class="p-field">
      <AppInputText
        ref="countryRef"
        v-model="property.location.country"
        label="Country"
        placeholder="Country"
        required
      />
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
