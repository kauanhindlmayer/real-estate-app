<script lang="ts" setup>
import { useRouter } from 'vue-router'
import BaseGallery from '@/components/wrappers/misc/BaseGallery.vue'
import formatCurrency from '@/utils/formatCurrency'
import type Property from '@/types/models/Property'

const props = defineProps<{ property: Property; showExtendedInfo?: boolean }>()

const router = useRouter()

function redirectToPropertyDetails() {
  router.push({ name: 'property-details', params: { id: props.property.id } })
}
</script>

<template>
  <BaseCard class="property-card">
    <template #header>
      <BaseGallery
        :images="property.imageSources"
        :show-thumbnails="false"
        show-item-navigators
        show-item-navigators-on-hover
        show-indicators
        circular
      />
    </template>

    <template #title>
      {{ property.title }}
    </template>

    <template #content>
      <p>{{ property.description }}</p>

      <div v-if="!showExtendedInfo">
        <p class="font-semibold">{{ formatCurrency(property.price) }}</p>
        <p>
          <i class="pi pi-map-marker" />
          {{ property.location.city }} - {{ property.location.state }}
        </p>
      </div>

      <div v-else class="property-card__extended-info">
        <div>
          <div class="font-medium">{{ $t('fields.price') }}</div>
          <div>{{ formatCurrency(property.price) }}</div>
        </div>
        <div>
          <div class="font-medium">{{ $t('properties.form.location') }}</div>
          <div>{{ property.location.city }} - {{ property.location.state }}</div>
        </div>
        <div>
          <div class="font-medium">{{ $t('fields.size') }}</div>
          <div>{{ property.size }}m²</div>
        </div>
        <div>
          <div class="font-medium">{{ $t('fields.bedrooms') }}</div>
          <div>{{ property.bedrooms }}</div>
        </div>
        <div>
          <div class="font-medium">{{ $t('fields.bathrooms') }}</div>
          <div>{{ property.bathrooms }}</div>
        </div>
        <div>
          <div class="font-medium">{{ $t('fields.type') }}</div>
          <div>{{ property.type }}</div>
        </div>
        <div>
          <div class="font-medium">{{ $t('fields.availability') }}</div>
          <div>{{ property.availability }}</div>
        </div>
      </div>
    </template>

    <template #footer>
      <BaseButton
        v-if="!showExtendedInfo"
        label="View"
        data-testid="view-button"
        @click="redirectToPropertyDetails"
      />
    </template>
  </BaseCard>
</template>

<style scoped>
.property-card__extended-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3rem;
  margin-top: 1.5rem;
}
</style>
