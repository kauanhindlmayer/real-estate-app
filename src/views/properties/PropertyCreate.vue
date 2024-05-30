<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { inject, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { object, string, number, array } from 'yup'
import { optionalsOptions, propertyTypesOptions } from './partials/propertiesResolver'
import { usePropertiesStore } from '@/stores/propertiesStore'
import useBaseToast from '@/composables/useBaseToast'
import BaseInlineMessage from '@/components/wrappers/form/BaseInlineMessage.vue'
import type Property from '@/types/models/Property'
import type LocationGateway from '@/gateways/LocationGateway'

const locationGateway = inject('locationGateway') as LocationGateway

const toast = useBaseToast()
const propertiesStore = usePropertiesStore()
const { t } = useI18n()

const validationSchema = object({
  title: string().required().min(5).max(100),
  description: string().required().min(20),
  price: number().required().positive().max(10000000),
  size: number().required().positive().max(100000),
  imageUrl: string().required().url(),
  type: string().required().oneOf(['house', 'apartment']),
  bedrooms: number().required().integer().min(0).max(50),
  bathrooms: number().required().integer().min(0).max(50),
  amenities: array().required().min(1).of(string()),
  availability: string()
    .required()
    .matches(/^\d{4}-\d{2}-\d{2}$/),
  zipCode: string()
    .required()
    .matches(/^\d{5}-\d{3}$/),
  address: string().required().min(5),
  city: string()
    .required()
    .matches(/^[a-zA-Z\sá]+$/)
    .min(2),
  state: string().required().length(2),
  country: string()
    .required()
    .matches(/^[a-zA-Z\s]+$/)
    .min(2)
})

const { handleSubmit, errors, setValues } = useForm({ validationSchema })
const { value: title } = useField('title')
const { value: description } = useField('description')
const { value: price } = useField('price')
const { value: size } = useField('size')
const { value: imageUrl } = useField('imageUrl')
const { value: type } = useField('type')
const { value: bedrooms } = useField('bedrooms')
const { value: bathrooms } = useField('bathrooms')
const { value: amenities } = useField('amenities')
const { value: availability } = useField('availability')
const { value: zipCode } = useField('zipCode')
const { value: address } = useField('address')
const { value: city } = useField('city')
const { value: state } = useField('state')
const { value: country } = useField('country')

const saveProperty = handleSubmit(async (values) => {
  propertiesStore.saveProperty(values as Property)
})

const isLoading = ref(false)

async function getLocationByZipCode() {
  isLoading.value = true
  try {
    const location = await locationGateway.getByZipCode(zipCode.value)
    setValues({
      address: location.address,
      city: location.city,
      state: location.state,
      country: location.country,
      zipCode: location.zipCode
    })
    toast.success({ message: t('properties.form.messages.locationFound') })
  } catch {
    toast.error({ message: t('properties.form.messages.locationNotFound') })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="form-container">
    <h1 data-testid="title" class="mb-0">{{ $t('properties.form.title') }}</h1>
    <p data-testid="subtitle" class="mb-4">{{ $t('properties.form.subtitle') }}</p>
    <form @submit.prevent="saveProperty">
      <div class="grid">
        <div class="col-6">
          <BaseInputText
            v-model="title"
            :error="errors.title"
            :label="$t('fields.title')"
            :placeholder="$t('fields.title')"
            data-testid="title-input"
          />
        </div>
        <div class="col-6">
          <BaseInputText
            v-model="description"
            :error="errors.description"
            :label="$t('fields.description')"
            :placeholder="$t('fields.description')"
            data-testid="description-input"
          />
        </div>

        <div class="col-4">
          <BaseInputNumber
            v-model="price"
            :error="errors.price"
            mode="currency"
            currency="USD"
            locale="en-US"
            :label="$t('fields.price')"
            :placeholder="$t('fields.price')"
            data-testid="price-input"
          />
        </div>
        <div class="col-2">
          <BaseInputNumber
            v-model="size"
            :error="errors.size"
            :label="$t('fields.size')"
            :placeholder="$t('fields.size')"
            suffix="m²"
            data-testid="size-input"
          />
        </div>
        <div class="col-3">
          <BaseInputText
            v-model="imageUrl"
            :error="errors.imageUrl"
            type="url"
            :label="$t('fields.imageUrl')"
            :placeholder="$t('fields.imageUrl')"
            data-testid="imageUrl-input"
          />
        </div>
        <div class="col-3">
          <BaseMultiSelect
            v-model="type"
            :error="errors.type"
            :label="$t('fields.type')"
            :placeholder="$t('fields.type')"
            :options="propertyTypesOptions"
            option-label="label"
            option-value="value"
            data-testid="type-input"
          />
        </div>

        <div class="col-2">
          <BaseInputNumber
            v-model="bedrooms"
            :error="errors.bedrooms"
            :label="$t('fields.bedrooms')"
            :placeholder="$t('fields.bedrooms')"
            data-testid="bedrooms-input"
          />
        </div>
        <div class="col-2">
          <BaseInputNumber
            v-model="bathrooms"
            :error="errors.bathrooms"
            :label="$t('fields.bathrooms')"
            :placeholder="$t('fields.bathrooms')"
            data-testid="bathrooms-input"
          />
        </div>
        <div class="col-4">
          <BaseMultiSelect
            v-model="amenities"
            :error="errors.amenities"
            :label="$t('fields.amenities')"
            :placeholder="$t('fields.amenities')"
            :options="optionalsOptions"
            option-label="label"
            option-value="value"
            data-testid="amenities-input"
          />
        </div>
        <div class="col-4">
          <BaseInputText
            v-model="availability"
            :error="errors.availability"
            :label="$t('fields.availability')"
            :placeholder="$t('fields.availability')"
            data-testid="availability-input"
          />
        </div>

        <div class="col-2">
          <BaseInputMask
            v-model="zipCode"
            :label="$t('fields.zipCode')"
            :placeholder="$t('fields.zipCode')"
            :error="errors.zipCode"
            mask="99999-999"
            @change="getLocationByZipCode"
          />
        </div>
        <div class="col-3">
          <BaseInputText
            v-model="address"
            :label="$t('fields.address')"
            :placeholder="$t('fields.address')"
            :error="errors.address"
          />
        </div>
        <div class="col-3">
          <BaseInputText
            v-model="city"
            :label="$t('fields.city')"
            :placeholder="$t('fields.city')"
            :error="errors.city"
          />
        </div>
        <div class="col-2">
          <BaseInputText
            v-model="state"
            :label="$t('fields.state')"
            :placeholder="$t('fields.state')"
            :error="errors.state"
          />
        </div>
        <div class="col-2">
          <BaseInputText
            v-model="country"
            :label="$t('fields.country')"
            :placeholder="$t('fields.country')"
            :error="errors.country"
          />
        </div>
      </div>

      <BaseInlineMessage
        severity="info"
        class="mt-4"
        :text="$t('properties.form.propertyDataEditRestriction')"
      />

      <footer class="flex justify-content-end">
        <BaseButton
          :label="$t('common.buttons.save')"
          icon="pi pi-check"
          class="w-3 mt-4"
          :loading="isLoading"
          type="submit"
        />
      </footer>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 900px;
  margin: 0 auto;
  background-color: var(--primary-bg-color);
  border-radius: 0.5rem;
  padding: 2rem;
}
</style>

<style>
.p-menuitem-link {
  background-color: var(--secondary-color) !important;
}
</style>
