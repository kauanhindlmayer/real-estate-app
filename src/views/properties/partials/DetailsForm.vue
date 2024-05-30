<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { object, string, number, array } from 'yup'
import { optionalsOptions, propertyTypesOptions } from './propertiesResolver'
import BaseInlineMessage from '@/components/wrappers/form/BaseInlineMessage.vue'
import Property from '@/types/models/Property'

const property = defineModel<Property>({ default: () => new Property() })

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
    .matches(/^\d{4}-\d{2}-\d{2}$/)
})

const { handleSubmit, errors } = useForm({ validationSchema })
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

const next = handleSubmit(async (values) => {
  property.value = { ...property.value, ...values }
  emit('next-step')
})
</script>

<template>
  <form>
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

      <div class="col-6">
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
      <div class="col-6">
        <BaseInputNumber
          v-model="size"
          :error="errors.size"
          :label="$t('fields.size')"
          :placeholder="$t('fields.size')"
          suffix="m²"
          data-testid="size-input"
        />
      </div>

      <div class="col-6">
        <BaseInputText
          v-model="imageUrl"
          :error="errors.imageUrl"
          type="url"
          :label="$t('fields.imageUrl')"
          :placeholder="$t('fields.imageUrl')"
          data-testid="imageUrl-input"
        />
      </div>
      <div class="col-6">
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

      <div class="col-6">
        <BaseInputNumber
          v-model="bedrooms"
          :error="errors.bedrooms"
          :label="$t('fields.bedrooms')"
          :placeholder="$t('fields.bedrooms')"
          data-testid="bedrooms-input"
        />
      </div>
      <div class="col-6">
        <BaseInputNumber
          v-model="bathrooms"
          :error="errors.bathrooms"
          :label="$t('fields.bathrooms')"
          :placeholder="$t('fields.bathrooms')"
          data-testid="bathrooms-input"
        />
      </div>

      <div class="col-6">
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
      <div class="col-6">
        <BaseInputText
          v-model="availability"
          :error="errors.availability"
          :label="$t('fields.availability')"
          :placeholder="$t('fields.availability')"
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
