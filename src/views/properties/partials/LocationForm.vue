<script setup lang="ts">
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePropertiesStore } from '@/stores/propertiesStore'
import useBaseToast from '@/composables/useBaseToast'
import LocationGateway from '@/gateways/LocationGateway'
import Property from '@/types/models/Property'
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'

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

const validationSchema = object({
  zipCode: string().required(),
  address: string().required(),
  city: string().required(),
  state: string().required(),
  country: string().required()
})

const { validate, values, errors } = useForm({ validationSchema })
const { value: zipCode } = useField('zipCode')
const { value: address } = useField('address')
const { value: city } = useField('city')
const { value: state } = useField('state')
const { value: country } = useField('country')

async function saveProperty() {
  const result = await validate()
  if (!result.valid) {
    toast.error({ message: t('properties.form.messages.pleaseFillAllRequiredFields') })
    return
  }
  property.value.location = { ...property.value.location, ...values }
  propertiesStore.saveProperty(property.value)
}
</script>

<template>
  <form @submit.prevent="saveProperty">
    <BaseInputText
      v-model="zipCode"
      :label="$t('properties.form.fields.zipCode.label')"
      :placeholder="$t('properties.form.fields.zipCode.placeholder')"
      :error="errors.zipCode"
      @change="getLocationByZipCode"
    />

    <BaseInputText
      v-model="address"
      :label="$t('properties.form.fields.address.label')"
      :placeholder="$t('properties.form.fields.address.placeholder')"
      :error="errors.address"
    />

    <BaseInputText
      v-model="city"
      :label="$t('properties.form.fields.city.label')"
      :placeholder="$t('properties.form.fields.city.placeholder')"
      :error="errors.city"
    />

    <BaseInputText
      v-model="state"
      :label="$t('properties.form.fields.state.label')"
      :placeholder="$t('properties.form.fields.state.placeholder')"
      :error="errors.state"
    />

    <BaseInputText
      v-model="country"
      :label="$t('properties.form.fields.country.label')"
      :placeholder="$t('properties.form.fields.country.placeholder')"
      :error="errors.country"
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
