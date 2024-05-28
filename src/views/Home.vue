<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/wrappers/form/BaseButton.vue'
import BaseCard from '@/components/wrappers/misc/BaseCard.vue'

const router = useRouter()

const location = ref('')
const selectedPropertyType = ref('House')

function selectPropertyType(type: string) {
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
            :class="[
              'property-types__option',
              { 'property-types__option--selected': selectedPropertyType === 'House' }
            ]"
            @click="selectPropertyType('house')"
          >
            {{ $t('common.houses') }}
          </div>
          <div
            :class="[
              'property-types__option',
              { 'property-types__option--selected': selectedPropertyType === 'Apartment' }
            ]"
            @click="selectPropertyType('apartment')"
          >
            {{ $t('common.apartments') }}
          </div>
          <div class="property-types__option" @click="redirectToPropertyAdvertise">
            {{ $t('home.wantToSell') }}
          </div>
        </div>

        <div class="flex align-items-center gap-2">
          <BaseInputIcon
            v-model="location"
            icon="pi pi-map-marker"
            class="w-30rem"
            :placeholder="$t('properties.list.filters.locationPlaceholder')"
            type="search"
            @keyup.enter="redirectToPropertyList"
          />
          <BaseButton :label="$t('home.seeOffers', { count: 8 })" @click="redirectToPropertyList" />
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
.property-types__option {
  cursor: pointer;
  font-weight: 600;
  color: #cccccc;
  padding: 0.5rem;
}
.property-types__option:hover {
  color: #333333;
  font-weight: 600;
}
.property-types__option--selected {
  color: #333333;
  font-weight: 600;
  border-bottom: 2px solid var(--primary-color);
}
</style>
