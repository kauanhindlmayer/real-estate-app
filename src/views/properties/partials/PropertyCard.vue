<script lang="ts" setup>
import { useRouter } from 'vue-router'
import BaseCard from '@/components/wrappers/misc/BaseCard.vue'
import BaseGallery from '@/components/wrappers/misc/BaseGallery.vue'
import BaseTag from '@/components/wrappers/misc/BaseTag.vue'
import Property from '@/types/models/Property'
import formatCurrency from '@/utils/formatCurrency'

const props = defineProps<{
  property: Property
  showExtendedInfo?: boolean
}>()

const router = useRouter()

function redirectToPropertyDetails() {
  router.push({ name: 'property-details', params: { id: props.property.id } })
}
</script>

<template>
  <div class="flex flex-column gap-3">
    <BaseCard>
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

        <div v-if="showExtendedInfo" class="flex align-items-center gap-6 mt-4">
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

        <div v-else>
          <p class="font-semibold">{{ formatCurrency(property.price) }}</p>
          <p>
            <i class="pi pi-map-marker" />
            {{ property.location.city }} - {{ property.location.state }}
          </p>
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
    <BaseCard v-if="showExtendedInfo">
      <template #title> {{ $t('fields.amenities') }} </template>
      <template #content>
        <BaseTag
          v-for="amenity in property.amenities"
          :key="amenity"
          :value="amenity"
          severity="secondary"
          class="mr-2"
        />
      </template>
    </BaseCard>
    <BaseCard v-if="showExtendedInfo">
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
</template>

<style scoped>
.seller-info__title {
  font-weight: 600;
  margin-bottom: 1rem;
}
.seller-info p {
  margin: 0;
}
</style>
