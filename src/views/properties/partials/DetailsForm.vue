<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useBaseToast from '@/composables/useBaseToast'
import BaseInputText from '@/components/wrappers/form/BaseInputText.vue'
import BaseInputNumber from '@/components/wrappers/form/BaseInputNumber.vue'
import BaseInlineMessage from '@/components/wrappers/form/BaseInlineMessage.vue'
import Property from '@/types/models/Property'
import { optionalsOptions } from './propertiesResolver'
import BaseMultiSelect from '@/components/wrappers/form/BaseMultiSelect.vue'

const toast = useBaseToast()
const { t } = useI18n()

const property = defineModel<Property>({ default: () => new Property() })

const imageUrl = ref('')

const titleRef = ref<InstanceType<typeof BaseInputText> | null>(null)
const descriptionRef = ref<InstanceType<typeof BaseInputText> | null>(null)
const priceRef = ref<InstanceType<typeof BaseInputNumber> | null>(null)
const sizeRef = ref<InstanceType<typeof BaseInputNumber> | null>(null)
const imageUrlRef = ref<InstanceType<typeof BaseInputText> | null>(null)
const typeRef = ref<InstanceType<typeof BaseInputText> | null>(null)
const bedroomsRef = ref<InstanceType<typeof BaseInputNumber> | null>(null)
const bathroomsRef = ref<InstanceType<typeof BaseInputNumber> | null>(null)
const amenitiesRef = ref<InstanceType<typeof BaseInputText> | null>(null)
const availabilityRef = ref<InstanceType<typeof BaseInputText> | null>(null)

function validateFields() {
  const fieldsToValidate = [
    titleRef,
    descriptionRef,
    priceRef,
    sizeRef,
    imageUrlRef,
    typeRef,
    bedroomsRef,
    bathroomsRef,
    amenitiesRef,
    availabilityRef
  ]
  const validationResults = fieldsToValidate.map((ref) => ref.value?.isValid())
  return validationResults.every((valid) => valid)
}

const emit = defineEmits<{ (event: 'next-step'): void }>()

function next() {
  if (!validateFields()) {
    toast.error({ message: t('properties.form.messages.pleaseFillAllRequiredFields') })

    return
  }
  property.value.imageSources.push(imageUrl.value)
  emit('next-step')
}
</script>

<template>
  <form>
    <div class="flex align-items-center justify-content-between">
      <div>
        <BaseInputText
          ref="titleRef"
          v-model="property.title"
          :label="$t('properties.form.fields.title.label')"
          :placeholder="$t('properties.form.fields.title.placeholder')"
          data-testid="title-input"
          required
        />

        <BaseInputText
          ref="descriptionRef"
          v-model="property.description"
          :label="$t('properties.form.fields.description.label')"
          :placeholder="$t('properties.form.fields.description.placeholder')"
          data-testid="description-input"
          required
        />

        <BaseInputNumber
          ref="priceRef"
          v-model="property.price"
          mode="currency"
          currency="USD"
          locale="en-US"
          :label="$t('properties.form.fields.price.label')"
          :placeholder="$t('properties.form.fields.price.placeholder')"
          data-testid="price-input"
          required
        />

        <BaseInputNumber
          ref="sizeRef"
          v-model="property.size"
          :label="$t('properties.form.fields.size.label')"
          :placeholder="$t('properties.form.fields.size.placeholder')"
          suffix="m²"
          data-testid="size-input"
          required
        />

        <BaseInputText
          ref="imageUrlRef"
          v-model="imageUrl"
          type="url"
          :label="$t('properties.form.fields.imageUrl.label')"
          :placeholder="$t('properties.form.fields.imageUrl.placeholder')"
          data-testid="imageUrl-input"
          required
        />
      </div>

      <div>
        <BaseMultiSelect
          ref="typeRef"
          v-model="property.type"
          :label="$t('properties.form.fields.type.label')"
          :placeholder="$t('properties.form.fields.type.placeholder')"
          data-testid="type-input"
          required
        />

        <BaseInputNumber
          ref="bedroomsRef"
          v-model="property.bedrooms"
          :label="$t('properties.form.fields.bedrooms.label')"
          :placeholder="$t('properties.form.fields.bedrooms.placeholder')"
          data-testid="bedrooms-input"
          required
        />

        <BaseInputNumber
          ref="bathroomsRef"
          v-model="property.bathrooms"
          :label="$t('properties.form.fields.bathrooms.label')"
          :placeholder="$t('properties.form.fields.bathrooms.placeholder')"
          data-testid="bathrooms-input"
          required
        />

        <BaseMultiSelect
          ref="amenitiesRef"
          v-model="property.amenities"
          :label="$t('properties.form.fields.amenities.label')"
          :placeholder="$t('properties.form.fields.amenities.placeholder')"
          :options="optionalsOptions"
          option-label="label"
          option-value="value"
          data-testid="amenities-input"
          required
        />

        <BaseInputText
          ref="availabilityRef"
          v-model="property.availability"
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
