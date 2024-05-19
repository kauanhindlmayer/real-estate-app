<script setup lang="ts">
import Property from '@/types/models/Property'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppInputNumber from '@/components/wrappers/AppInputNumber.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const property = defineModel<Property>({ default: () => new Property() })

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

const emit = defineEmits(['next'])

function next() {
  if (!validateFields()) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields' })
    return
  }
  emit('next')
}
</script>

<template>
  <div class="p-fluid">
    <div class="p-field">
      <AppInputText ref="titleRef" v-model="property.title" label="Title" required />
    </div>

    <div class="p-field">
      <AppInputText
        ref="descriptionRef"
        v-model="property.description"
        label="Description"
        required
      />
    </div>

    <div class="p-field">
      <AppInputNumber
        ref="priceRef"
        v-model="property.price"
        mode="currency"
        currency="USD"
        locale="en-US"
        label="Price"
        required
      />
    </div>

    <div class="p-field">
      <AppInputNumber
        ref="sizeRef"
        v-model="property.size"
        label="Size (m²)"
        suffix="m²"
        required
      />
    </div>

    <div class="p-field">
      <AppInputText ref="imageUrlRef" v-model="property.imageUrl" label="Image URL" required />
    </div>

    <footer>
      <AppButton
        label="Next"
        icon="pi pi-arrow-right"
        icon-pos="right"
        class="w-2 mt-4"
        @click="next"
      />
    </footer>
  </div>
</template>

<style scoped>
.p-field {
  margin-bottom: 10px;
}
footer {
  display: flex;
  justify-content: flex-end;
}
</style>
