<script setup lang="ts">
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLoadingStore } from '@/stores/loadingStore'
import useBaseToast from '@/composables/useBaseToast'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import LocationGateway from '@/gateways/LocationGateway'
import type PropertyGateway from '@/gateways/PropertyGateway'
import Property from '@/types/models/Property'

const propertyGateway = inject('propertyGateway') as PropertyGateway
const locationGateway = inject('locationGateway') as LocationGateway

const toast = useBaseToast()
const router = useRouter()
const loadingStore = useLoadingStore()
const { t } = useI18n()

defineEmits<{ (event: 'previous-step'): void }>()

const property = defineModel<Property>({ default: () => new Property() })

async function getLocationByZipCode() {
  loadingStore.startLoading()
  try {
    const { zipCode } = property.value.location
    property.value.location = await locationGateway.getByZipCode(zipCode)
    toast.success({ message: t('properties.form.messages.locationFound') })
  } catch {
    toast.error({ message: t('properties.form.messages.locationNotFound') })
  } finally {
    loadingStore.stopLoading()
  }
}

async function saveProperty() {
  if (!validateFields()) {
    toast.error({ message: t('properties.form.messages.pleaseFillAllRequiredFields') })
    return
  }
  loadingStore.startLoading()
  try {
    await propertyGateway.save(property.value)
    toast.success({ message: t('properties.form.messages.propertyCreated') })
    router.push({ name: 'properties' })
  } catch {
    toast.error({ message: t('properties.form.messages.errorSavingProperty') })
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
</script>

<template>
  <form class="p-fluid" @submit.prevent="saveProperty">
    <div class="p-field">
      <AppInputText
        ref="zipCodeRef"
        v-model="property.location.zipCode"
        :label="$t('properties.form.fields.zipCode.label')"
        :placeholder="$t('properties.form.fields.zipCode.placeholder')"
        required
        @change="getLocationByZipCode"
      />
    </div>

    <div class="p-field">
      <AppInputText
        ref="addressRef"
        v-model="property.location.address"
        :label="$t('properties.form.fields.address.label')"
        :placeholder="$t('properties.form.fields.address.placeholder')"
        required
      />
    </div>

    <div class="p-field">
      <AppInputText
        ref="cityRef"
        v-model="property.location.city"
        :label="$t('properties.form.fields.city.label')"
        :placeholder="$t('properties.form.fields.city.placeholder')"
        required
      />
    </div>

    <div class="p-field">
      <AppInputText
        ref="stateRef"
        v-model="property.location.state"
        :label="$t('properties.form.fields.state.label')"
        :placeholder="$t('properties.form.fields.state.placeholder')"
        required
      />
    </div>

    <div class="p-field">
      <AppInputText
        ref="countryRef"
        v-model="property.location.country"
        :label="$t('properties.form.fields.country.label')"
        :placeholder="$t('properties.form.fields.country.placeholder')"
        required
      />
    </div>

    <footer>
      <AppButton
        :label="$t('properties.form.buttons.previous')"
        icon="pi pi-arrow-left"
        class="w-2 mt-4"
        type="button"
        @click="$emit('previous-step')"
      />
      <AppButton
        :label="$t('properties.form.buttons.save')"
        icon="pi pi-check"
        class="w-2 mt-4"
        type="submit"
      />
    </footer>
  </form>
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
