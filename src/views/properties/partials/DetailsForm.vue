<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import useBaseToast from '@/composables/useBaseToast'
import BaseInlineMessage from '@/components/wrappers/form/BaseInlineMessage.vue'
import Property from '@/types/models/Property'
import { optionalsOptions, propertyTypesOptions } from './propertiesResolver'
import { useField, useForm } from 'vee-validate'
import { object, string, number, array } from 'yup'

const toast = useBaseToast()
const { t } = useI18n()

const property = defineModel<Property>({ default: () => new Property() })

const validationSchema = object({
  title: string().required(),
  description: string().required(),
  price: number().required(),
  size: number().required(),
  imageUrl: string().required(),
  type: string().required(),
  bedrooms: number().required(),
  bathrooms: number().required(),
  amenities: array().required(),
  availability: string().required()
})

const { validate, errors, values } = useForm({ validationSchema })
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

const emit = defineEmits<{ (event: 'next-step'): void }>()

async function next() {
  const result = await validate()
  if (!result.valid) {
    toast.error({ message: t('properties.form.messages.pleaseFillAllRequiredFields') })
    return
  }
  property.value = { ...property.value, ...values }
  emit('next-step')
}
</script>

<template>
  <form>
    <div class="grid">
      <div class="col-6">
        <BaseInputText
          v-model="title"
          :error="errors.title"
          :label="$t('properties.form.fields.title.label')"
          :placeholder="$t('properties.form.fields.title.placeholder')"
          data-testid="title-input"
        />
      </div>
      <div class="col-6">
        <BaseInputText
          v-model="description"
          :error="errors.description"
          :label="$t('properties.form.fields.description.label')"
          :placeholder="$t('properties.form.fields.description.placeholder')"
          data-testid="description-input"
        />
      </div>

      <div class="col-6">
        <BaseInputNumber
          v-model="price"
          :error="errors.price"
          mode="currency"
          currency="USD"
          locale="en-US"
          :label="$t('properties.form.fields.price.label')"
          :placeholder="$t('properties.form.fields.price.placeholder')"
          data-testid="price-input"
        />
      </div>
      <div class="col-6">
        <BaseInputNumber
          v-model="size"
          :error="errors.size"
          :label="$t('properties.form.fields.size.label')"
          :placeholder="$t('properties.form.fields.size.placeholder')"
          suffix="m²"
          data-testid="size-input"
        />
      </div>

      <div class="col-6">
        <BaseInputText
          v-model="imageUrl"
          :error="errors.imageUrl"
          type="url"
          :label="$t('properties.form.fields.imageUrl.label')"
          :placeholder="$t('properties.form.fields.imageUrl.placeholder')"
          data-testid="imageUrl-input"
        />
      </div>
      <div class="col-6">
        <BaseMultiSelect
          v-model="type"
          :error="errors.type"
          :label="$t('properties.form.fields.type.label')"
          :placeholder="$t('properties.form.fields.type.placeholder')"
          :options="propertyTypesOptions"
          option-label="label"
          option-value="value"
          data-testid="type-input"
        />
      </div>

      <div class="col-6">
        <BaseInputNumber
          v-model="bedrooms"
          :error="errors.bedrooms"
          :label="$t('properties.form.fields.bedrooms.label')"
          :placeholder="$t('properties.form.fields.bedrooms.placeholder')"
          data-testid="bedrooms-input"
        />
      </div>
      <div class="col-6">
        <BaseInputNumber
          v-model="bathrooms"
          :error="errors.bathrooms"
          :label="$t('properties.form.fields.bathrooms.label')"
          :placeholder="$t('properties.form.fields.bathrooms.placeholder')"
          data-testid="bathrooms-input"
        />
      </div>

      <div class="col-6">
        <BaseMultiSelect
          v-model="amenities"
          :error="errors.amenities"
          :label="$t('properties.form.fields.amenities.label')"
          :placeholder="$t('properties.form.fields.amenities.placeholder')"
          :options="optionalsOptions"
          option-label="label"
          option-value="value"
          data-testid="amenities-input"
        />
      </div>
      <div class="col-6">
        <BaseInputText
          v-model="availability"
          :error="errors.availability"
          :label="$t('properties.form.fields.availability.label')"
          :placeholder="$t('properties.form.fields.availability.placeholder')"
          data-testid="availability-input"
        />
      </div>
    </div>

    <BaseInlineMessage
      severity="info"
      class="mt-4"
      :text="$t('properties.form.propertyDataEditRestriction')"
    />

    <footer>
      <BaseButton
        :label="$t('common.buttons.next')"
        icon="pi pi-arrow-right"
        icon-pos="right"
        class="w-3 mt-4"
        type="button"
        data-testid="next-button"
        @click="next"
      />
    </footer>
  </form>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: flex-end;
}
</style>
