<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePropertiesStore } from '@/stores/propertiesStore'
import { useField, useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import BaseCard from '@/components/wrappers/misc/BaseCard.vue'
import formatCurrency from '@/utils/formatCurrency'
import BaseInputTextarea from '@/components/wrappers/form/BaseInputTextarea.vue'
import BaseCheckbox from '@/components/wrappers/form/BaseCheckbox.vue'
import BaseTag from '@/components/wrappers/misc/BaseTag.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const propertiesStore = usePropertiesStore()

const { property } = storeToRefs(propertiesStore)

const validationSchema = object({
  name: string().required().min(5).max(100),
  email: string().required().email(),
  message: string().required().min(20),
  receiveContacts: boolean().required().oneOf([true, false])
})

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: {
    name: '',
    email: '',
    message: t('properties.interestedInRealEstateContactMe')
  }
})
const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: message } = useField('message')
const { value: receiveContacts } = useField('receiveContacts')

const sendMessageToSeller = handleSubmit((values) => {
  const phoneNumber = '5511999999999'
  const encodedMessage = encodeURIComponent(values.message)
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(whatsappURL, '_blank')
})

onBeforeMount(async () => {
  await propertiesStore.getPropertyById(route.params.id as string)
  if (!propertiesStore.property) {
    router.push({ name: 'not-found' })
  }
})
</script>

<template>
  <div class="pt-4">
    <div v-if="property" class="property-wrapper flex gap-2">
      <div class="w-12">
        <PropertyCard :property extended-data hide-footer />
        <BaseCard class="mt-3">
          <template #title> Amenities </template>
          <template #content>
            <BaseTag
              v-for="amenity in property.amenities"
              :key="amenity"
              :value="amenity"
              severity="secondary"
              class="mr-2"
            >
            </BaseTag>
          </template>
        </BaseCard>
        <BaseCard class="mt-3">
          <template #title> About the Seller </template>
          <template #content>
            <div class="seller-info">
              <p class="seller-info__title">{{ property.seller?.name }}</p>
              <p>{{ property.seller?.email }}</p>
              <p>{{ property.seller?.phone }}</p>
            </div>
          </template>
        </BaseCard>
      </div>
      <BaseCard class="message-seller-card w-5 ml-2">
        <template #title>
          <span class="text-4xl">{{ formatCurrency(property.price) }}</span>
        </template>
        <template #subtitle> {{ $t('properties.sendMessageToSeller') }} </template>
        <template #content>
          <div class="grid">
            <div class="col-12">
              <BaseInputText label="Name" placeholder="Name" v-model="name" :error="errors.name" />
            </div>
            <div class="col-12">
              <BaseInputText
                label="Email"
                placeholder="Email"
                v-model="email"
                :error="errors.email"
              />
            </div>
            <div class="col-12">
              <BaseInputTextarea
                label="Message"
                placeholder="Message"
                v-model="message"
                :error="errors.message"
                rows="4"
              />
            </div>
            <div class="col-12 flex gap-2">
              <BaseCheckbox
                v-model="receiveContacts"
                :label="$t('properties.receiveContactsFromRealEstate')"
                :value="false"
              />
            </div>
            <div class="col-12">
              <BaseButton label="Send" class="w-full" @click="sendMessageToSeller" />
            </div>
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<style scoped>
.property-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}
.message-seller-card {
  height: 33rem;
}
.seller-info__title {
  font-weight: 600;
  margin-bottom: 1rem;
}
.seller-info p {
  margin: 0;
}
</style>
