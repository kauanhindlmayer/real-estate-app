<script lang="ts" setup>
import type Property from '@/types/models/Property'

defineProps<{ property: Property }>()
</script>

<template>
  <BaseCard>
    <template #title> {{ $t('properties.aboutTheSeller') }} </template>
    <template #content>
      <div class="seller-card">
        <p class="seller-card__title">{{ property.seller?.name }}</p>
        <p>{{ property.seller?.email }}</p>
        <p>{{ property.seller?.phone }}</p>
      </div>
    </template>
  </BaseCard>
</template>

<style scoped>
.seller-card__title {
  font-weight: 600;
  margin-bottom: 1rem;
}
.seller-card p {
  margin: 0;
}
</style>
