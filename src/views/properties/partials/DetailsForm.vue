<script setup lang="ts">
import Property from '@/types/models/Property'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppInputNumber from '@/components/wrappers/AppInputNumber.vue'
import AppButton from '@/components/wrappers/AppButton.vue'

const property = defineModel<Property>({ default: () => new Property() })

const emit = defineEmits(['next'])

function next() {
  emit('next')
}
</script>

<template>
  <div class="p-fluid">
    <div class="p-field">
      <label for="title">Title</label>
      <AppInputText v-model="property.title" placeholder="Title" id="title" />
    </div>

    <div class="p-field">
      <label for="description">Description</label>
      <AppInputText v-model="property.description" placeholder="Description" id="description" />
    </div>

    <div class="p-field">
      <label for="price">Price</label>
      <AppInputNumber
        v-model="property.price"
        mode="currency"
        currency="USD"
        locale="en-US"
        placeholder="Price"
        id="price"
      />
    </div>

    <div class="p-field">
      <label for="size">Size (m²)</label>
      <AppInputNumber v-model="property.size" placeholder="Size (m²)" id="size" suffix="m²" />
    </div>

    <div class="p-field">
      <label for="imageUrl">Image URL</label>
      <AppInputText v-model="property.imageUrl" placeholder="Image URL" id="imageUrl" />
    </div>

    <footer>
      <AppButton
        label="Next"
        icon="pi pi-arrow-right"
        icon-pos="right"
        class="w-2 mt-4"
        @click="next"
      />
    </footer>
  </div>
</template>

<style scoped>
.p-field {
  margin-bottom: 10px;
}
footer {
  display: flex;
  justify-content: flex-end;
}
</style>
