<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePropertiesStore } from '@/stores/propertiesStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import AppSidebar from '@/components/wrappers/AppSidebar.vue'
import AppIconField from '@/components/wrappers/AppIconField.vue'
import AppInputIcon from '@/components/wrappers/AppInputIcon.vue'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import AppSkeleton from '@/components/wrappers/AppSkeleton.vue'
import AppBreadcrumb from '@/components/wrappers/AppBreadcrumb.vue'
import AppChips from '@/components/wrappers/AppChips.vue'
import AppCheckboxGroup from '@/components/wrappers/AppCheckboxGroup.vue'
import type { IPropertyFilters } from '@/gateways/PropertyGateway'
import { SellerTypeEnum } from '@/types/enums/SellerTypeEnum'
import toCamelCase from '@/utils/toCamelCase'

const { t } = useI18n()
const router = useRouter()
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

const sortByOptions = [
  { label: t('properties.list.mostRelevant'), value: 'mostRelevant' },
  { label: t('properties.list.priceAscending'), value: 'priceLowToHigh' },
  { label: t('properties.list.priceDescending'), value: 'priceHighToLow' },
  { label: t('properties.list.newest'), value: 'newest' }
]

const activeFilters = computed<string[]>(() => {
  return Object.entries(filters.value)
    .filter(([, value]) => value)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${t(`properties.list.filters.${key}`)}: ${value.map((v: string) => t(`properties.list.filters.${toCamelCase(v)}`)).join(', ')}`
      }
      return `${t(`properties.list.filters.${key}`)}: ${value}`
    })
})

const sellerTypesOptions = [
  {
    label: t('properties.list.filters.realEstateAgency'),
    value: SellerTypeEnum.REAL_ESTATE_AGENCY
  },
  {
    label: t('properties.list.filters.privateSeller'),
    value: SellerTypeEnum.PRIVATE_SELLER
  },
  {
    label: t('properties.list.filters.developer'),
    value: SellerTypeEnum.DEVELOPER
  },
  {
    label: t('properties.list.filters.builder'),
    value: SellerTypeEnum.BUILDER
  },
  {
    label: t('properties.list.filters.investor'),
    value: SellerTypeEnum.INVESTOR
  }
]

const optionalsOptions = [
  { label: t('properties.list.filters.hasGarage'), value: 'hasGarage' },
  { label: t('properties.list.filters.hasGarden'), value: 'hasGarden' },
  { label: t('properties.list.filters.hasPool'), value: 'hasPool' },
  { label: t('properties.list.filters.hasElevator'), value: 'hasElevator' },
  { label: t('properties.list.filters.hasTerrace'), value: 'hasTerrace' }
]

onBeforeMount(getAllProperties)
</script>

<template>
  <div class="flex -m-4">
    <AppSidebar v-model="isSidebarCollapsed">
      <template #default>
        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.location') }}</div>
          <AppIconField iconPosition="right">
            <AppInputIcon class="pi pi-map-marker" />
            <AppInputText
              v-model="filters.location"
              :placeholder="$t('properties.list.filters.locationPlaceholder')"
              type="search"
              @keyup.enter="getAllProperties"
            />
          </AppIconField>
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.priceRange') }}</div>
          <div class="flex justify-content-between gap-2">
            <div class="field">
              <AppInputNumber
                v-model="filters.minPrice"
                :placeholder="$t('properties.list.from')"
                inputClass="w-3"
                mode="currency"
                currency="USD"
                locale="en-US"
                @update:modelValue="getAllProperties"
              />
            </div>
            <div class="field">
              <AppInputNumber
                v-model="filters.maxPrice"
                :placeholder="$t('properties.list.to')"
                inputClass="w-3"
                mode="currency"
                currency="USD"
                locale="en-US"
                @update:modelValue="getAllProperties"
              />
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.yearBuilt') }}</div>
          <div class="flex justify-content-between gap-2">
            <div class="field">
              <AppInputNumber
                v-model="filters.minYearBuilt"
                :placeholder="$t('properties.list.from')"
                inputClass="w-3"
                @update:modelValue="getAllProperties"
              />
            </div>
            <div class="field">
              <AppInputNumber
                v-model="filters.maxYearBuilt"
                :placeholder="$t('properties.list.to')"
                inputClass="w-3"
                @update:modelValue="getAllProperties"
              />
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.size') }}</div>
          <div class="flex justify-content-between gap-2">
            <div class="field">
              <AppInputNumber
                v-model="filters.minSize"
                :placeholder="$t('properties.list.from')"
                inputClass="w-3"
                suffix="m²"
                @update:modelValue="getAllProperties"
              />
            </div>
            <div class="field">
              <AppInputNumber
                v-model="filters.maxSize"
                :placeholder="$t('properties.list.to')"
                inputClass="w-3"
                suffix="m²"
                @update:modelValue="getAllProperties"
              />
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.bedrooms') }}</div>
          <div class="field">
            <AppInputNumber
              v-model="filters.minBedrooms"
              placeholder="Minimum"
              @update:modelValue="getAllProperties"
            />
          </div>
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.bathrooms') }}</div>
          <div class="field">
            <AppInputNumber
              v-model="filters.minBathrooms"
              placeholder="Minimum"
              @update:modelValue="getAllProperties"
            />
          </div>
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.sellerTypes') }}</div>
          <AppCheckboxGroup
            v-model="filters.sellerTypes"
            name="sellerTypes"
            :options="sellerTypesOptions"
          />
        </div>

        <div class="p-3">
          <div class="section__title">{{ $t('properties.list.filters.optionals') }}</div>
          <AppCheckboxGroup
            v-model="filters.optionals"
            name="optionals"
            :options="optionalsOptions"
          />
        </div>
      </template>

      <template #footer>
        <AppButton
          :label="$t('properties.list.filters.clearFilters')"
          severity="secondary"
          class="w-full"
          :loading="isLoading"
          @click="clearFilters"
        />
      </template>
    </AppSidebar>
    <div class="flex-1">
      <div class="top-bar">
        <div class="flex align-items-center">
          <i class="pi pi-sliders-h mr-4" @click="toggleSidebar" style="cursor: pointer" />
          <AppChips v-model="activeFilters" :limit="7" />
        </div>
        <div class="flex align-items-center gap-2">
          <AppIconField iconPosition="left">
            <AppInputIcon class="pi pi-search" />
            <AppInputText
              v-model="filters.title"
              :placeholder="$t('properties.list.filters.titlePlaceholder')"
              type="search"
              @keyup.enter="getAllProperties"
            />
          </AppIconField>
          <AppDropdown
            v-model="filters.sortBy"
            :options="sortByOptions"
            option-label="label"
            option-value="value"
            placeholder="Most Relevant"
            @update:modelValue="getAllProperties"
          />
        </div>
      </div>
      <div class="property-list">
        <header class="mb-4">
          <AppBreadcrumb :model="breadcrumbItems" />
          <h2 class="mb-1">{{ $t('common.properties') }}</h2>
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
</style>
