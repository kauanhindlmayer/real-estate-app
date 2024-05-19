<template>
  <div class="property-card">
    <div class="property-card__header">
      <h3>{{ property.title }}</h3>
    </div>
    <div class="property-card__image">
      <img :src="property.imageUrl" alt="Property Image" />
    </div>
    <div class="property-card__body">
      <p>{{ property.description }}</p>
      <p>Price: ${{ property.price }}</p>
      <p>Area: {{ property.size }}m²</p>
    </div>
    <div class="property-card__footer">
      <AppButton label="View" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Property from '@/types/models/Property'
import AppButton from '@/components/wrappers/AppButton.vue'

const { property } = defineProps<{
  property: Property
}>()
</script>

<style scoped>
.property-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
}

.property-card__header {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.property-card__image img {
  width: 100%;
  height: auto;
}

.property-card__body {
  padding: 10px;
}

.property-card__footer {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
