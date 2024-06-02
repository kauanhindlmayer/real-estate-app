<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePropertiesStore } from '@/stores/propertiesStore'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import BaseSidebar from '@/components/wrappers/menu/BaseSidebar.vue'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import BaseBreadcrumb from '@/components/wrappers/misc/BaseBreadcrumb.vue'
import BaseTag from '@/components/wrappers/misc/BaseTag.vue'
import toCamelCase from '@/utils/toCamelCase'
import propertiesResolver from '@/views/properties/partials/propertiesResolver'
import type { IPropertyFilters } from '@/types/propertyFilters'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const propertiesStore = usePropertiesStore()
const { properties, propertiesCount, isLoading } = storeToRefs(propertiesStore)

const isSidebarCollapsed = ref(false)
const filters = ref<IPropertyFilters>({})

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

async function getAllProperties() {
  const activeFilters = Object.fromEntries(
    Object.entries(filters.value).filter(([, value]) => value)
  )
  router.push({ query: activeFilters })
  await propertiesStore.getAllProperties(filters.value)
}

async function clearFilters() {
  filters.value = {}
  await getAllProperties()
}

const breadcrumbItems = [
  { label: t('common.home'), to: { name: 'home' } },
  { label: t('common.properties') }
]

const activeFilters = computed<string[]>(() => {
  const MAX_FILTERS = 7
  const formattedFilters = Object.entries(filters.value)
    .filter(([, value]) => value)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${t(`properties.list.filters.${key}`)}: ${value.map((v: string) => t(`properties.list.filters.${toCamelCase(v)}`)).join(', ')}`
      }
      return `${t(`properties.list.filters.${key}`)}: ${value}`
    })
  if (formattedFilters.length > MAX_FILTERS) {
    formattedFilters.splice(MAX_FILTERS, formattedFilters.length - MAX_FILTERS, '...')
  }
  return formattedFilters
})

onBeforeMount(async () => {
  filters.value = route.query
  await getAllProperties()
})
</script>

<template>
  <div class="flex -m-4">
    <BaseSidebar v-model="isSidebarCollapsed">
      <template #default>
        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.location') }}</div>
          <BaseInputIcon
            v-model="filters.location"
            :placeholder="$t('properties.list.filters.locationPlaceholder')"
            icon="pi pi-map-marker"
            iconPosition="right"
            type="search"
            @keyup.enter="getAllProperties"
          />
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.priceRange') }}</div>
          <div class="flex justify-content-between gap-2">
            <BaseInputNumber
              v-model="filters.minPrice"
              :placeholder="$t('properties.list.from')"
              input-class="w-3"
              mode="currency"
              currency="USD"
              locale="en-US"
              @update:modelValue="getAllProperties"
            />
            <BaseInputNumber
              v-model="filters.maxPrice"
              :placeholder="$t('properties.list.to')"
              input-class="w-3"
              mode="currency"
              currency="USD"
              locale="en-US"
              @update:modelValue="getAllProperties"
            />
          </div>
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.yearBuilt') }}</div>
          <div class="flex justify-content-between gap-2">
            <BaseInputNumber
              v-model="filters.minYearBuilt"
              :placeholder="$t('properties.list.from')"
              input-class="w-3"
              @update:modelValue="getAllProperties"
            />
            <BaseInputNumber
              v-model="filters.maxYearBuilt"
              :placeholder="$t('properties.list.to')"
              input-class="w-3"
              @update:modelValue="getAllProperties"
            />
          </div>
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.size') }}</div>
          <div class="flex justify-content-between gap-2">
            <BaseInputNumber
              v-model="filters.minSize"
              :placeholder="$t('properties.list.from')"
              input-class="w-3"
              suffix="m²"
              @update:modelValue="getAllProperties"
            />
            <BaseInputNumber
              v-model="filters.maxSize"
              :placeholder="$t('properties.list.to')"
              input-class="w-3"
              suffix="m²"
              @update:modelValue="getAllProperties"
            />
          </div>
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.bedrooms') }}</div>
          <BaseInputNumber
            v-model="filters.minBedrooms"
            placeholder="Minimum"
            @update:modelValue="getAllProperties"
          />
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.bathrooms') }}</div>
          <BaseInputNumber
            v-model="filters.minBathrooms"
            placeholder="Minimum"
            @update:modelValue="getAllProperties"
          />
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.sellerTypes') }}</div>
          <BaseCheckboxGroup
            v-model="filters.sellerTypes"
            name="sellerTypes"
            :options="propertiesResolver.sellerTypesOptions"
          />
        </div>

        <div class="p-3">
          <div class="section__title">{{ $t('properties.list.filters.amenities') }}</div>
          <BaseCheckboxGroup
            v-model="filters.amenities"
            name="amenities"
            :options="propertiesResolver.amenitiesOptions"
          />
        </div>
      </template>

      <template #footer>
        <BaseButton
          :label="$t('properties.list.filters.clearFilters')"
          severity="secondary"
          class="w-full"
          :loading="isLoading"
          @click="clearFilters"
        />
      </template>
    </BaseSidebar>
    <div class="flex-1">
      <div class="top-bar">
        <div class="flex align-items-center">
          <i class="pi pi-sliders-h mr-4" @click="toggleSidebar" style="cursor: pointer" />
          <div class="active-filters-container">
            <BaseTag
              v-for="(activeFilter, index) in activeFilters"
              :key="index"
              :value="activeFilter"
              severity="secondary"
            />
          </div>
        </div>
        <div class="flex align-items-center gap-2">
          <BaseInputIcon
            v-model="filters.title"
            :placeholder="$t('properties.list.filters.titlePlaceholder')"
            icon="pi pi-search"
            type="search"
            icon-position="left"
            class="w-full"
            @keyup.enter="getAllProperties"
          />
          <BaseDropdown
            v-model="filters.sortBy"
            :options="propertiesResolver.sortByOptions"
            option-label="label"
            option-value="value"
            placeholder="Most Relevant"
            @update:modelValue="getAllProperties"
          />
        </div>
      </div>
      <div class="property-list">
        <header class="mb-4">
          <BaseBreadcrumb :model="breadcrumbItems" />
          <h2 class="mb-1">{{ $t('common.properties') }}</h2>
          <p class="m-0">{{ $t('properties.list.description', { count: propertiesCount }) }}</p>
        </header>
        <div v-if="isLoading" class="property-list__cards">
          <BaseSkeleton v-for="n in 8" :key="n" width="23rem" height="36rem" borderRadius="8px" />
        </div>
        <div v-else class="property-list__skeletons">
          <PropertyCard v-for="property in properties" :key="property.id" :property />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section {
  padding: 1rem;
  border-bottom: 1px solid var(--primary-border-color);
}
.section__title {
  font-weight: 600;
  margin-bottom: 0.5rem;
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
.active-filters-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
@media (max-width: 1024px) {
  .active-filters-container {
    display: none;
  }
}
</style>
