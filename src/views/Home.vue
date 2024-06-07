<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

type PropertyType = 'House' | 'Apartment'

const router = useRouter()

const location = ref('')
const selectedPropertyType = ref<PropertyType>('House')

function selectPropertyType(type: PropertyType) {
  selectedPropertyType.value = type
}

function redirectToPropertyAdvertise() {
  router.push({ name: 'property-advertise' })
}

function redirectToPropertyList() {
  router.push({
    name: 'properties-list',
    query: { type: selectedPropertyType.value, location: location.value }
  })
}
</script>

<template>
  <div class="container">
    <BaseCard class="container__card">
      <template #content>
        <div class="property-types">
          <div
            :class="['option', { 'option--selected': selectedPropertyType === 'House' }]"
            @click="selectPropertyType('House')"
          >
            {{ $t('common.houses') }}
          </div>
          <div
            :class="['option', { 'option--selected': selectedPropertyType === 'Apartment' }]"
            @click="selectPropertyType('Apartment')"
          >
            {{ $t('common.apartments') }}
          </div>
          <div class="option" @click="redirectToPropertyAdvertise">
            {{ $t('home.wantToSell') }}
          </div>
        </div>

        <div class="flex flex-column align-items-center gap-2 md:flex-row">
          <BaseInputIcon
            v-model="location"
            icon="pi pi-map-marker"
            class="w-full md:w-30rem"
            :placeholder="$t('properties.list.filters.locationPlaceholder')"
            type="search"
            @keyup.enter="redirectToPropertyList"
          />
          <BaseButton
            class="w-full md:w-4"
            :label="$t('home.seeOffers', { count: 8 })"
            @click="redirectToPropertyList"
          />
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
}
.container__card {
  max-width: 800px;
  margin: 0 auto 12rem auto;
}
.property-types {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}
.option {
  cursor: pointer;
  font-weight: 600;
  color: var(--text-color-secondary);
  padding: 0.5rem;
}
.option:hover {
  color: var(--text-primary-color);
  font-weight: 600;
}
.option--selected {
  color: var(--text-primary-color);
  font-weight: 600;
  border-bottom: 2px solid var(--primary-color);
}
</style>
