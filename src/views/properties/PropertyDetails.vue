<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
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
import ReportAdDialog from '@/views/properties/partials/ReportAdDialog.vue'
import BaseInputNumber from '@/components/wrappers/form/BaseInputNumber.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const propertiesStore = usePropertiesStore()

const { property } = storeToRefs(propertiesStore)
const reportAdDialogRef = ref<InstanceType<typeof ReportAdDialog> | null>(null)

const validationSchema = object({
  name: string().required().min(5).max(100),
  email: string().required().email(),
  phone: string().required().min(10).max(15),
  message: string().required().min(20),
  receiveContacts: boolean().required()
})

const { handleSubmit, errors, setFieldValue } = useForm({ validationSchema })
const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: phone } = useField('phone')
const { value: message } = useField('message')
const { value: receiveContacts } = useField('receiveContacts')

const sendMessageToSeller = handleSubmit((values) => {
  const phoneNumber = '5511999999999'
  const encodedMessage = encodeURIComponent(values.message)
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(whatsappURL, '_blank')
})

onBeforeMount(async () => {
  setFieldValue('message', t('properties.interestedInRealEstateContactMe'))
  await propertiesStore.getPropertyById(route.params.id as string)
  if (!property.value) {
    router.push({ name: 'not-found' })
  }
})
</script>

<template>
  <div v-if="property" class="container flex gap-3 pt-4">
    <div class="flex flex-column gap-3 w-12">
      <PropertyCard :property show-extended-info />
      <BaseCard>
        <template #title> {{ $t('fields.amenities') }} </template>
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
      <BaseCard>
        <template #title> {{ $t('properties.aboutTheSeller') }} </template>
        <template #content>
          <div class="seller-info">
            <p class="seller-info__title">{{ property.seller?.name }}</p>
            <p>{{ property.seller?.email }}</p>
            <p>{{ property.seller?.phone }}</p>
          </div>
        </template>
      </BaseCard>
    </div>
    <div class="w-6">
      <BaseCard>
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
              <BaseInputNumber
                label="Phone"
                placeholder="Phone"
                v-model="phone"
                :error="errors.phone"
                class="w-full"
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
                :error="errors.receiveContacts"
              />
            </div>
            <div class="col-12">
              <BaseButton label="Send" class="w-full" @click="sendMessageToSeller" />
            </div>
          </div>
        </template>
      </BaseCard>
      <div class="flex justify-content-center gap-2">
        <p class="report-ad" @click="reportAdDialogRef?.openDialog">
          <i class="pi pi-flag" style="font-size: 0.875rem" />
          {{ $t('properties.reportThisAd') }}
        </p>
      </div>
    </div>
  </div>
  <ReportAdDialog ref="reportAdDialogRef" />
</template>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
}
.seller-info__title {
  font-weight: 600;
  margin-bottom: 1rem;
}
.seller-info p {
  margin: 0;
}
.report-ad {
  font-size: 0.875rem;
  color: #666;
  cursor: pointer;
}
.report-ad:hover {
  text-decoration: underline;
}
</style>
