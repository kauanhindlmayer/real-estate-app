<script lang="ts" setup>
import { ref } from 'vue'
import Property from '@/types/models/Property'
import AppSteps from '@/components/wrappers/AppSteps.vue'
import LocationForm from '@/views/properties/partials/LocationForm.vue'
import DetailsForm from '@/views/properties/partials/DetailsForm.vue'

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
    label: 'Details',
    component: DetailsForm
  },
  {
    label: 'Location',
    component: LocationForm
  }
]
</script>

<template>
  <h1>Create Property</h1>
  <p>Fill in the details to add a new property to your listings</p>

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
