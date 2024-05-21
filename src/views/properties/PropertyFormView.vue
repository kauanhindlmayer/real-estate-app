<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Property from '@/types/models/Property'
import AppSteps from '@/components/wrappers/AppSteps.vue'
import LocationForm from '@/views/properties/partials/LocationForm.vue'
import DetailsForm from '@/views/properties/partials/DetailsForm.vue'

const { t } = useI18n()

const property = ref<Property>(new Property())

function nextStep() {
  if (active.value >= items.length - 1) return
  active.value++
}

function previousStep() {
  if (active.value <= 0) return
  active.value--
}

const active = ref(0)

const items = [
  {
    label: t('properties.form.details'),
    component: DetailsForm
  },
  {
    label: t('properties.form.location'),
    component: LocationForm
  }
]
</script>

<template>
  <h1>{{ $t('properties.form.title') }}</h1>
  <p>{{ $t('properties.form.description') }}</p>

  <div class="form-container">
    <AppSteps v-model:active-step="active" :model="items" />

    <KeepAlive>
      <component
        :is="items[active].component"
        v-model="property"
        @previous="previousStep"
        @next="nextStep"
      />
    </KeepAlive>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
