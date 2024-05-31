<script lang="ts" setup>
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import BaseCard from '@/components/wrappers/misc/BaseCard.vue'
import BaseGallery from '@/components/wrappers/misc/BaseGallery.vue'
import Property from '@/types/models/Property'
import formatCurrency from '@/utils/formatCurrency'

interface IProps {
  property: Property
  showFooter?: boolean
  extendedData?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  showFooter: false,
  extendedData: false
})

const { property } = toRefs(props)

const router = useRouter()

function redirectToPropertyDetails() {
  router.push({ name: 'property-details', params: { id: property.value.id } })
}
</script>

<template>
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
      <div v-if="!extendedData">
        <p>
          <strong>{{ formatCurrency(property.price) }}</strong>
        </p>
        <p>
          <i class="pi pi-map-marker" />
          {{ property.location.city }} - {{ property.location.state }}
        </p>
      </div>
      <div v-else class="flex align-items-center mt-4">
        <div class="mr-6">
          <div class="font-medium">Location</div>
          <div>{{ property.location.city }} - {{ property.location.state }}</div>
        </div>
        <div class="mr-6">
          <div class="font-medium">Size</div>
          <div>{{ property.size }} m²</div>
        </div>
        <div class="mr-6">
          <div class="font-medium">Bedrooms</div>
          <div>{{ property.bedrooms }}</div>
        </div>
        <div class="mr-6">
          <div class="font-medium">Bathrooms</div>
          <div>{{ property.bathrooms }}</div>
        </div>
        <div class="mr-6">
          <div class="font-medium">Type</div>
          <div>{{ property.type }}</div>
        </div>
        <div class="mr-6">
          <div class="font-medium">Availability</div>
          <div>{{ property.availability }}</div>
        </div>
      </div>
    </template>

    <template #footer>
      <BaseButton
        v-if="showFooter"
        label="View"
        data-testid="view-button"
        @click="redirectToPropertyDetails"
      />
    </template>
  </BaseCard>
</template>
