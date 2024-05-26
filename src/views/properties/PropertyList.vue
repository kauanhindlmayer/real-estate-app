<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePropertiesStore } from '@/stores/propertiesStore'
import { storeToRefs } from 'pinia'
import AppSidebar from '@/components/wrappers/AppSidebar.vue'
import AppIconField from '@/components/wrappers/AppIconField.vue'
import AppInputIcon from '@/components/wrappers/AppInputIcon.vue'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import AppSkeleton from '@/components/wrappers/AppSkeleton.vue'
import AppCheckbox from '@/components/wrappers/AppCheckbox.vue'
import AppDropdown from '@/components/wrappers/AppDropdown.vue'
import AppChips, { type IChip } from '@/components/wrappers/AppChips.vue'
import type { IPropertyFilters } from '@/gateways/PropertyGateway'
import { SellerTypeEnum } from '@/types/enums/SellerTypeEnum'

const { t } = useI18n()
const propertiesStore = usePropertiesStore()
const { properties, propertiesCount, isLoading } = storeToRefs(propertiesStore)

const isSidebarCollapsed = ref(false)
const filters = ref<IPropertyFilters>({})

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

async function getAllProperties() {
  await propertiesStore.getAllProperties(filters.value)
}

async function clearFilters() {
  filters.value = {}
  await getAllProperties()
}

const sortByOptions = [
  { label: t('properties.list.mostRelevant'), value: 'mostRelevant' },
  { label: t('properties.list.priceAscending'), value: 'priceLowToHigh' },
  { label: t('properties.list.priceDescending'), value: 'priceHighToLow' },
  { label: t('properties.list.newest'), value: 'newest' }
]

const filtersMap = {
  city: 'City',
  minPrice: 'Min Price',
  maxPrice: 'Max Price',
  minYearBuilt: 'Min Year Built',
  maxYearBuilt: 'Max Year Built',
  minSize: 'Min Size',
  maxSize: 'Max Size',
  minBedrooms: 'Min Bedrooms',
  minBathrooms: 'Min Bathrooms',
  sellerTypes: 'Seller Types',
  hasGarage: 'Has Garage',
  hasGarden: 'Has Garden',
  hasPool: 'Has Pool',
  hasElevator: 'Has Elevator',
  hasTerrace: 'Has Terrace'
}

type FiltersMapKey = keyof typeof filtersMap

const activeFilters = computed<IChip[]>(() => {
  return Object.entries(filters.value)
    .filter(([, value]) => value)
    .map(([key, value]) => {
      return {
        id: key,
        text: `${filtersMap[key as FiltersMapKey]}: ${value}`
      }
    })
})

onBeforeMount(getAllProperties)
</script>

<template>
  <div class="flex -m-4">
    <AppSidebar v-model="isSidebarCollapsed">
      <template #default>
        <div class="location-section section-border">
          <div class="section-title">Location</div>
          <AppIconField iconPosition="right">
            <AppInputIcon class="pi pi-map-marker" />
            <AppInputText
              v-model="filters.city"
              :placeholder="$t('properties.list.filters.location.placeholder')"
              type="search"
              @keyup.enter="getAllProperties"
            />
          </AppIconField>
        </div>

        <div class="price-section section-border">
          <div class="section-title">Price Range</div>
          <div class="flex justify-content-between gap-2">
            <div class="field">
              <AppInputNumber
                v-model="filters.minPrice"
                :placeholder="$t('properties.list.from')"
                inputClass="w-3"
                mode="currency"
                currency="USD"
                locale="en-US"
                @change="getAllProperties"
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
                @change="getAllProperties"
              />
            </div>
          </div>
        </div>

        <div class="year-built-section section-border">
          <div class="section-title">Year Built</div>
          <div class="flex justify-content-between gap-2">
            <div class="field">
              <AppInputNumber
                v-model="filters.minYearBuilt"
                :placeholder="$t('properties.list.from')"
                inputClass="w-3"
                @change="getAllProperties"
              />
            </div>
            <div class="field">
              <AppInputNumber
                v-model="filters.maxYearBuilt"
                :placeholder="$t('properties.list.to')"
                inputClass="w-3"
                @change="getAllProperties"
              />
            </div>
          </div>
        </div>

        <div class="size-section section-border">
          <div class="section-title">Size (m²)</div>
          <div class="flex justify-content-between gap-2">
            <div class="field">
              <AppInputNumber
                v-model="filters.minSize"
                :placeholder="$t('properties.list.from')"
                inputClass="w-3"
                suffix="m²"
                @change="getAllProperties"
              />
            </div>
            <div class="field">
              <AppInputNumber
                v-model="filters.maxSize"
                :placeholder="$t('properties.list.to')"
                inputClass="w-3"
                suffix="m²"
                @change="getAllProperties"
              />
            </div>
          </div>
        </div>

        <div class="bedrooms-section section-border">
          <div class="section-title">Bedrooms</div>
          <div class="field">
            <AppInputNumber
              v-model="filters.minBedrooms"
              placeholder="Minimum"
              @change="getAllProperties"
            />
          </div>
        </div>

        <div class="bathrooms-section section-border">
          <div class="section-title">Bathrooms</div>
          <div class="field">
            <AppInputNumber
              v-model="filters.minBathrooms"
              placeholder="Minimum"
              @change="getAllProperties"
            />
          </div>
        </div>

        <div class="seller-type-section section-border">
          <div class="section-title">Seller Type</div>
          <div class="flex flex-column">
            <div class="flex">
              <AppCheckbox
                v-model="filters.sellerTypes"
                inputId="real-estate-agency"
                name="sellerTypes"
                :value="SellerTypeEnum.REAL_ESTATE_AGENCY"
              />
              <label for="real-estate-agency" class="ml-2">Real Estate Agency</label>
            </div>
            <div class="flex">
              <AppCheckbox
                v-model="filters.sellerTypes"
                inputId="private-seller"
                name="sellerTypes"
                :value="SellerTypeEnum.PRIVATE_SELLER"
              />
              <label for="private-seller" class="ml-2">Private Seller</label>
            </div>
            <div class="flex">
              <AppCheckbox
                v-model="filters.sellerTypes"
                inputId="developer"
                name="sellerTypes"
                :value="SellerTypeEnum.DEVELOPER"
              />
              <label for="developer" class="ml-2">Developer</label>
            </div>
            <div class="flex">
              <AppCheckbox
                v-model="filters.sellerTypes"
                inputId="builder"
                name="sellerTypes"
                :value="SellerTypeEnum.BUILDER"
              />
              <label for="builder" class="ml-2">Builder</label>
            </div>
            <div class="flex">
              <AppCheckbox
                v-model="filters.sellerTypes"
                inputId="investor"
                name="sellerTypes"
                :value="SellerTypeEnum.INVESTOR"
              />
              <label for="investor" class="ml-2">Investor</label>
            </div>
          </div>
        </div>

        <div class="optionals-section p-3">
          <div class="section-title">Optionals</div>
          <div class="flex flex-column">
            <div class="flex">
              <AppCheckbox
                v-model="filters.hasGarage"
                inputId="has-garage"
                name="hasGarage"
                :value="true"
              />
              <label for="has-garage" class="ml-2">Has Garage</label>
            </div>
            <div class="flex">
              <AppCheckbox
                v-model="filters.hasGarden"
                inputId="has-garden"
                name="hasGarden"
                :value="true"
              />
              <label for="has-garden" class="ml-2">Has Garden</label>
            </div>
            <div class="flex">
              <AppCheckbox
                v-model="filters.hasPool"
                inputId="has-pool"
                name="hasPool"
                :value="true"
              />
              <label for="has-pool" class="ml-2">Has Pool</label>
            </div>
            <div class="flex">
              <AppCheckbox
                v-model="filters.hasElevator"
                inputId="has-elevator"
                name="hasElevator"
                :value="true"
              />
              <label for="has-elevator" class="ml-2">Has Elevator</label>
            </div>
            <div class="flex">
              <AppCheckbox
                v-model="filters.hasTerrace"
                inputId="has-terrace"
                name="hasTerrace"
                :value="true"
              />
              <label for="has-terrace" class="ml-2">Has Terrace</label>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <AppButton
          :label="$t('properties.list.filters.clearFilters')"
          severity="secondary"
          class="w-full"
          @click="clearFilters"
        />
      </template>
    </AppSidebar>
    <div class="flex-1">
      <div class="top-bar">
        <div class="flex align-items-center">
          <i class="pi pi-sliders-h mr-4" @click="toggleSidebar" style="cursor: pointer" />
          <AppChips v-model="activeFilters" />
        </div>
        <div class="flex align-items-center gap-2">
          <AppIconField iconPosition="left">
            <AppInputIcon class="pi pi-search" />
            <AppInputText
              v-model="filters.title"
              placeholder="Type the property title"
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
            @change="getAllProperties"
          />
        </div>
      </div>
      <div class="property-list">
        <header class="mb-4">
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
.section-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.section-border {
  padding: 1rem;
  border-bottom: 1px solid var(--primary-border-color);
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
