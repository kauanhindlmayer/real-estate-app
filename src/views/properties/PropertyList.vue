<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { usePropertiesStore } from '@/stores/propertiesStore'
import { storeToRefs } from 'pinia'
import AppSidebar from '@/components/wrappers/AppSidebar.vue'
import AppIconField from '@/components/wrappers/AppIconField.vue'
import AppInputIcon from '@/components/wrappers/AppInputIcon.vue'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import AppSkeleton from '@/components/wrappers/AppSkeleton.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import type { IPropertyFilters } from '@/gateways/PropertyGateway'

const propertiesStore = usePropertiesStore()
const { properties, propertiesCount, isLoading } = storeToRefs(propertiesStore)

const isSidebarCollapsed = ref(false)
const filters = ref<IPropertyFilters>({
  city: '',
  title: '',
  minPrice: 0,
  maxPrice: 0
})

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

async function getAllProperties() {
  await propertiesStore.getAllProperties(filters.value)
}

async function clearFilters() {
  filters.value = {
    city: '',
    title: '',
    minPrice: 0,
    maxPrice: 0
  }
  await getAllProperties()
}

onBeforeMount(getAllProperties)
</script>

<template>
  <div class="flex -m-4">
    <AppSidebar v-model="isSidebarCollapsed">
      <template #default>
        <AppIconField iconPosition="right">
          <AppInputIcon>
            <i class="pi pi-map-marker" />
          </AppInputIcon>
          <AppInputText
            v-model="filters.city"
            placeholder="Type your city or state"
            type="search"
            @keyup.enter="getAllProperties"
          />
        </AppIconField>

        <!-- <div class="price-section">
          <h4>Price</h4>
          <div class="flex justify-content-between">
            <div>
              <AppInputText
                v-model="filters.minPrice"
                label="Min"
                placeholder="Min"
                class="w-6"
                @change="getAllProperties"
              />
            </div>
            <div>
              <AppInputText
                v-model="filters.maxPrice"
                label="Max"
                placeholder="Max"
                class="w-6"
                @change="getAllProperties"
              />
            </div>
          </div>
        </div> -->
      </template>

      <template #footer>
        <AppButton
          label="Clear filters"
          severity="secondary"
          class="w-full"
          @click="clearFilters"
        />
      </template>
    </AppSidebar>
    <div class="flex-1">
      <div class="top-bar">
        <i class="pi pi-sliders-h" @click="toggleSidebar" style="cursor: pointer" />
        <AppIconField iconPosition="left">
          <AppInputIcon>
            <i class="pi pi-search" />
          </AppInputIcon>
          <AppInputText
            v-model="filters.title"
            placeholder="Type the property title"
            type="search"
            @keyup.enter="getAllProperties"
          />
        </AppIconField>
      </div>
      <div class="property-list">
        <header class="mb-4">
          <h2 class="mb-1">{{ $t('properties.list.title') }}</h2>
          <p class="m-0">{{ $t('properties.list.description', { count: propertiesCount }) }}</p>
        </header>
        <div v-if="isLoading" class="property-list__cards">
          <AppSkeleton v-for="n in 8" :key="n" width="23rem" height="36rem" borderRadius="8px" />
        </div>
        <div v-else class="property-list__skeletons">
          <PropertyCard v-for="property in properties" :key="property.id" :property show-footer />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price-section {
  border-top: 1px solid var(--primary-border-color);
  margin-top: 1rem;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-bg-color);
  padding: 1rem;
}
.property-list {
  padding: 2rem;
  height: calc(100vh - 134px);
  overflow-y: auto;
}
.property-list__cards,
.property-list__skeletons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
