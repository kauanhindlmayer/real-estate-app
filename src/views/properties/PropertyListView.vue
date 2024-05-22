<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePropertiesStore } from '@/stores/propertiesStore'
import AppIconField from '@/components/wrappers/AppIconField.vue'
import AppInputIcon from '@/components/wrappers/AppInputIcon.vue'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'

const router = useRouter()
const propertiesStore = usePropertiesStore()

const title = ref('')

function redirectToPropertyCreate() {
  router.push({ name: 'property-create' })
}

onBeforeMount(async () => {
  await propertiesStore.getAllProperties()
})
</script>

<template>
  <header>
    <div>
      <h1>{{ $t('properties.list.title') }}</h1>
      <p>{{ $t('properties.list.description', { count: propertiesStore.properties.length }) }}</p>
    </div>
    <div class="flex gap-2">
      <AppIconField iconPosition="left">
        <AppInputIcon>
          <i class="pi pi-search" />
        </AppInputIcon>
        <AppInputText
          v-model="title"
          :placeholder="$t('baseLayout.header.buttons.search')"
          type="search"
          @keyup.enter="propertiesStore.getAllProperties(title)"
          @change="propertiesStore.getAllProperties(title)"
        />
      </AppIconField>
      <AppButton
        :label="$t('properties.list.buttons.createProperty')"
        @click="redirectToPropertyCreate"
      />
    </div>
  </header>
  <main class="property-cards-container">
    <PropertyCard v-for="property in propertiesStore.properties" :key="property.id" :property />
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.property-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
