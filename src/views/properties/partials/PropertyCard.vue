<template>
  <AppCard>
    <template #header>
      <img
        :src="property.imageUrl || 'https://via.placeholder.com/300'"
        alt="Property Image"
        class="property-image"
      />
    </template>

    <template #title>
      {{ property.title }}
    </template>

    <template #content>
      <p>{{ property.description }}</p>
      <p>
        <strong>{{ $t('property.details.price') }}:</strong> ${{ property.price }}
      </p>
      <p>
        <strong>{{ $t('property.details.size') }}:</strong> {{ property.size }}m²
      </p>
    </template>

    <template #footer>
      <AppButton v-if="!props.hideFooter" label="View" @click="redirectToPropertyDetails" />
    </template>
  </AppCard>
</template>

<script lang="ts" setup>
import AppCard from '@/components/wrappers/AppCard.vue'
import Property from '@/types/models/Property'
import AppButton from '@/components/wrappers/AppButton.vue'
import { useRouter } from 'vue-router'
import { withDefaults, defineProps, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    property: Property
    hideFooter?: boolean
  }>(),
  {
    hideFooter: false
  }
)

const router = useRouter()

const property = computed(() => props.property)

function redirectToPropertyDetails() {
  router.push({ name: 'property-details', params: { id: property.value.id } })
}
</script>

<style scoped>
.property-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}
</style>
