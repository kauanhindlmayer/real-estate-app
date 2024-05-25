<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { usePropertiesStore } from '@/stores/propertiesStore'
import { storeToRefs } from 'pinia'
import AppSidebar from '@/components/wrappers/AppSidebar.vue'
import AppIconField from '@/components/wrappers/AppIconField.vue'
import AppInputIcon from '@/components/wrappers/AppInputIcon.vue'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import AppSkeleton from '@/components/wrappers/AppSkeleton.vue'
import AppCheckbox from '@/components/wrappers/AppCheckbox.vue'
import type { IPropertyFilters } from '@/gateways/PropertyGateway'
import { SellerTypeEnum } from '@/types/enums/SellerTypeEnum'

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
        <div class="location-section section-border">
          <div class="section-title">Location</div>
          <AppIconField iconPosition="right">
            <AppInputIcon class="pi pi-map-marker" />
            <AppInputText
              v-model="filters.city"
              placeholder="Type your city or state"
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
                label="From"
                placeholder="From"
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
                label="To"
                placeholder="To"
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
                label="From"
                placeholder="From"
                inputClass="w-3"
                @change="getAllProperties"
              />
            </div>
            <div class="field">
              <AppInputNumber
                v-model="filters.maxYearBuilt"
                label="To"
                placeholder="To"
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
                label="From"
                placeholder="From"
                inputClass="w-3"
                suffix="m²"
                @change="getAllProperties"
              />
            </div>
            <div class="field">
              <AppInputNumber
                v-model="filters.maxSize"
                label="To"
                placeholder="To"
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
              label="Minimum"
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
              label="Minimum"
              placeholder="Minimum"
              @change="getAllProperties"
            />
          </div>
        </div>

        <div class="seller-type-section p-3">
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
          <AppInputIcon class="pi pi-search" />
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
