<script setup lang="ts">
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePropertiesStore } from '@/stores/propertiesStore'
import useBaseToast from '@/composables/useBaseToast'
import LocationGateway from '@/gateways/LocationGateway'
import Property from '@/types/models/Property'

const locationGateway = inject('locationGateway') as LocationGateway

const toast = useBaseToast()
const propertiesStore = usePropertiesStore()
const { t } = useI18n()

defineEmits<{ (event: 'previous-step'): void }>()

const property = defineModel<Property>({ default: () => new Property() })
const isLoading = ref(false)

async function getLocationByZipCode() {
  isLoading.value = true
  try {
    const { zipCode } = property.value.location
    property.value.location = await locationGateway.getByZipCode(zipCode)
    toast.success({ message: t('properties.form.messages.locationFound') })
  } catch {
    toast.error({ message: t('properties.form.messages.locationNotFound') })
  } finally {
    isLoading.value = false
  }
}

async function saveProperty() {
  if (!validateFields()) {
    toast.error({ message: t('properties.form.messages.pleaseFillAllRequiredFields') })
    return
  }
  propertiesStore.saveProperty(property.value)
}

const zipCodeRef = ref<InstanceType<typeof BaseInputText> | null>(null)
const addressRef = ref<InstanceType<typeof BaseInputText> | null>(null)
const cityRef = ref<InstanceType<typeof BaseInputText> | null>(null)
const stateRef = ref<InstanceType<typeof BaseInputText> | null>(null)
const countryRef = ref<InstanceType<typeof BaseInputText> | null>(null)

function validateFields() {
  const fieldsToValidate = [zipCodeRef, addressRef, cityRef, stateRef, countryRef]
  const validationResults = fieldsToValidate.map((ref) => ref.value?.isValid())
  return validationResults.every((valid) => valid)
}
</script>

<template>
  <form @submit.prevent="saveProperty">
    <BaseInputText
      ref="zipCodeRef"
      v-model="property.location.zipCode"
      :label="$t('properties.form.fields.zipCode.label')"
      :placeholder="$t('properties.form.fields.zipCode.placeholder')"
      required
      @change="getLocationByZipCode"
    />

    <BaseInputText
      ref="addressRef"
      v-model="property.location.address"
      :label="$t('properties.form.fields.address.label')"
      :placeholder="$t('properties.form.fields.address.placeholder')"
      required
    />

    <BaseInputText
      ref="cityRef"
      v-model="property.location.city"
      :label="$t('properties.form.fields.city.label')"
      :placeholder="$t('properties.form.fields.city.placeholder')"
      required
    />

    <BaseInputText
      ref="stateRef"
      v-model="property.location.state"
      :label="$t('properties.form.fields.state.label')"
      :placeholder="$t('properties.form.fields.state.placeholder')"
      required
    />

    <BaseInputText
      ref="countryRef"
      v-model="property.location.country"
      :label="$t('properties.form.fields.country.label')"
      :placeholder="$t('properties.form.fields.country.placeholder')"
      required
    />

    <footer>
      <BaseButton
        :label="$t('common.buttons.previous')"
        icon="pi pi-arrow-left"
        class="w-3 mt-4"
        type="button"
        @click="$emit('previous-step')"
      />
      <BaseButton
        :label="$t('common.buttons.save')"
        icon="pi pi-check"
        class="w-3 mt-4"
        :loading="isLoading"
        type="submit"
      />
    </footer>
  </form>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: space-between;
}
</style>
