<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseInlineMessage from '@/components/wrappers/form/BaseInlineMessage.vue'
import Property from '@/types/models/Property'
import { optionalsOptions, propertyTypesOptions } from './propertiesResolver'
import { useField, useForm } from 'vee-validate'
import { object, string, number, array } from 'yup'

const { t } = useI18n()
const property = defineModel<Property>({ default: () => new Property() })

const validationSchema = object({
  title: string()
    .required(t('properties.form.fields.title.required'))
    .min(5, t('properties.form.fields.title.minLength'))
    .max(100, t('properties.form.fields.title.maxLength')),
  description: string()
    .required(t('properties.form.fields.description.required'))
    .min(20, t('properties.form.fields.description.minLength')),
  price: number()
    .required(t('properties.form.fields.price.required'))
    .positive(t('properties.form.fields.price.minValue'))
    .max(10000000, t('properties.form.fields.price.maxValue')),
  size: number()
    .required(t('properties.form.fields.size.required'))
    .positive(t('properties.form.fields.size.minValue'))
    .max(100000, t('properties.form.fields.size.maxValue')),
  imageUrl: string()
    .required(t('properties.form.fields.imageUrl.required'))
    .url(t('properties.form.fields.imageUrl.invalidFormat')),
  type: string()
    .required(t('properties.form.fields.type.required'))
    .oneOf(['house', 'apartment'], t('properties.form.fields.type.invalidValue')),
  bedrooms: number()
    .required(t('properties.form.fields.bedrooms.required'))
    .integer(t('properties.form.fields.bedrooms.integer'))
    .min(0, t('properties.form.fields.bedrooms.minValue'))
    .max(50, t('properties.form.fields.bedrooms.maxValue')),
  bathrooms: number()
    .required(t('properties.form.fields.bathrooms.required'))
    .integer(t('properties.form.fields.bathrooms.integer'))
    .min(0, t('properties.form.fields.bathrooms.minValue'))
    .max(50, t('properties.form.fields.bathrooms.maxValue')),
  amenities: array()
    .required(t('properties.form.fields.amenities.required'))
    .min(1, t('properties.form.fields.amenities.minValue'))
    .of(string()),
  availability: string()
    .required(t('properties.form.fields.availability.required'))
    .matches(/^\d{4}-\d{2}-\d{2}$/, t('properties.form.fields.availability.invalidFormat'))
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
