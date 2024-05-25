<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useBaseToast from '@/composables/useBaseToast'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppInputNumber from '@/components/wrappers/AppInputNumber.vue'
import Property from '@/types/models/Property'

const toast = useBaseToast()
const { t } = useI18n()

const property = defineModel<Property>({ default: () => new Property() })

const imageUrl = ref('')

const titleRef = ref<InstanceType<typeof AppInputText> | null>(null)
const descriptionRef = ref<InstanceType<typeof AppInputText> | null>(null)
const priceRef = ref<InstanceType<typeof AppInputNumber> | null>(null)
const sizeRef = ref<InstanceType<typeof AppInputNumber> | null>(null)
const imageUrlRef = ref<InstanceType<typeof AppInputText> | null>(null)

function validateFields() {
  const fieldsToValidate = [titleRef, descriptionRef, priceRef, sizeRef, imageUrlRef]
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
  <form class="flex flex-column gap-1">
    <AppInputText
      ref="titleRef"
      v-model="property.title"
      :label="$t('properties.form.fields.title.label')"
      :placeholder="$t('properties.form.fields.title.placeholder')"
      data-testid="title-input"
      required
    />

    <AppInputText
      ref="descriptionRef"
      v-model="property.description"
      :label="$t('properties.form.fields.description.label')"
      :placeholder="$t('properties.form.fields.description.placeholder')"
      data-testid="description-input"
      required
    />

    <AppInputNumber
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

    <AppInputNumber
      ref="sizeRef"
      v-model="property.size"
      :label="$t('properties.form.fields.size.label')"
      :placeholder="$t('properties.form.fields.size.placeholder')"
      suffix="m²"
      data-testid="size-input"
      required
    />

    <AppInputText
      ref="imageUrlRef"
      v-model="imageUrl"
      type="url"
      :label="$t('properties.form.fields.imageUrl.label')"
      :placeholder="$t('properties.form.fields.imageUrl.placeholder')"
      data-testid="imageUrl-input"
      required
    />

    <footer>
      <AppButton
        :label="$t('properties.form.buttons.next')"
        icon="pi pi-arrow-right"
        icon-pos="right"
        class="w-2 mt-4"
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
