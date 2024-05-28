<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseSteps from '@/components/wrappers/menu/BaseSteps.vue'
import LocationForm from '@/views/properties/partials/LocationForm.vue'
import DetailsForm from '@/views/properties/partials/DetailsForm.vue'
import Property from '@/types/models/Property'

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
  },
  {
    label: t('properties.form.review'),
    component: 'div'
  }
]
</script>

<template>
  <div class="steps-container">
    <BaseSteps v-model:active-step="active" :model="items" class="mb-4" />
  </div>

  <div class="form-container">
    <div class="flex justify-content-center">
      <h1 data-testid="title">{{ $t('properties.form.title') }}</h1>
    </div>

    <KeepAlive>
      <component
        :is="items[active].component"
        v-model="property"
        @previous-step="previousStep"
        @next-step="nextStep"
      />
    </KeepAlive>
  </div>
</template>

<style scoped>
.steps-container {
  max-width: 900px;
  margin: 1rem auto;
  background-color: var(--secondary-bg-color);
}
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 900px;
  margin: 0 auto;
  background-color: var(--primary-bg-color);
  border-radius: 0.5rem;
  padding: 2rem;
}
</style>

<style>
.p-menuitem-link {
  background-color: var(--secondary-color) !important;
}
</style>
