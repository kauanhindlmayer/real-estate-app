<script setup lang="ts">
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePropertiesStore } from '@/stores/propertiesStore'
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
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

const validationSchema = object({
  zipCode: string()
    .required()
    .matches(/^\d{5}-\d{3}$/),
  address: string().required().min(5),
  city: string()
    .required()
    .matches(/^[a-zA-Z\s]+$/)
    .min(2),
  state: string().required().length(2),
  country: string()
    .required()
    .matches(/^[a-zA-Z\s]+$/)
    .min(2)
})

const { handleSubmit, errors } = useForm({ validationSchema })
const { value: zipCode } = useField('zipCode')
const { value: address } = useField('address')
const { value: city } = useField('city')
const { value: state } = useField('state')
const { value: country } = useField('country')

const saveProperty = handleSubmit(async (values) => {
  property.value.location = { ...property.value.location, ...values }
  propertiesStore.saveProperty(property.value)
})
</script>

<template>
  <form @submit.prevent="saveProperty">
    <BaseInputText
      v-model="zipCode"
      :label="$t('fields.zipCode')"
      :placeholder="$t('fields.zipCode')"
      :error="errors.zipCode"
      @change="getLocationByZipCode"
    />

    <BaseInputText
      v-model="address"
      :label="$t('fields.address')"
      :placeholder="$t('fields.address')"
      :error="errors.address"
    />

    <BaseInputText
      v-model="city"
      :label="$t('fields.city')"
      :placeholder="$t('fields.city')"
      :error="errors.city"
    />

    <BaseInputText
      v-model="state"
      :label="$t('fields.state')"
      :placeholder="$t('fields.state')"
      :error="errors.state"
    />

    <BaseInputText
      v-model="country"
      :label="$t('fields.country')"
      :placeholder="$t('fields.country')"
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
