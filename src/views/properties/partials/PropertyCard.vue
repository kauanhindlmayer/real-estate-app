<template>
  <AppCard>
    <template #header>
      <AppGallery
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
      <AppButton
        v-if="props.showFooter"
        label="View"
        data-testid="view-button"
        @click="redirectToPropertyDetails"
      />
    </template>
  </AppCard>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import AppCard from '@/components/wrappers/AppCard.vue'
import AppGallery from '@/components/wrappers/AppGallery.vue'
import Property from '@/types/models/Property'
import AppButton from '@/components/wrappers/AppButton.vue'
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
