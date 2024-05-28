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
}

const props = withDefaults(defineProps<IProps>(), {
  showFooter: false
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
      <p>
        <strong> {{ formatCurrency(property.price) }}</strong>
      </p>
      <p>
        <i class="pi pi-map-marker" />
        {{ property.location.city }} - {{ property.location.state }}
      </p>
    </template>

    <template #footer>
      <BaseButton
        v-if="props.showFooter"
        label="View"
        data-testid="view-button"
        @click="redirectToPropertyDetails"
      />
    </template>
  </BaseCard>
</template>
