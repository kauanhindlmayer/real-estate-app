<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { usePropertiesStore } from '@/stores/propertiesStore'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import BaseCard from '@/components/wrappers/misc/BaseCard.vue'
import formatCurrency from '@/utils/formatCurrency'
import BaseInputTextarea from '@/components/wrappers/form/BaseInputTextarea.vue'
import BaseCheckbox from '@/components/wrappers/form/BaseCheckbox.vue'
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const propertiesStore = usePropertiesStore()

const validationSchema = object({
  name: string().required().min(5).max(100),
  email: string().required().email(),
  message: string().required().min(20),
  receiveContacts: string()
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

onBeforeMount(() => {
  propertiesStore.getPropertyById(route.params.id as string)
})
</script>

<template>
  <div class="pt-4">
    <div v-if="propertiesStore.property" class="property-wrapper flex gap-2">
      <PropertyCard :property="propertiesStore.property" hide-footer class="w-12" />
      <BaseCard class="w-5">
        <template #title>
          <span class="title">{{ formatCurrency(propertiesStore.property.price) }}</span>
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
              <BaseCheckbox v-model="receiveContacts" value="yes" />
              <label>{{ $t('properties.receiveContactsFromRealEstate') }}</label>
            </div>
            <div class="col-12">
              <BaseButton label="Send" class="w-full" @click="sendMessageToSeller" />
            </div>
          </div>
        </template>
      </BaseCard>
    </div>
    <div v-else class="property-not-found-wrapper">{{ $t('properties.propertyNotFound') }}</div>
  </div>
</template>

<style scoped>
.property-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}
.title {
  font-size: 2rem;
}
.property-not-found-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}
</style>
