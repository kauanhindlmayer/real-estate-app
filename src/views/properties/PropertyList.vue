<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { usePropertiesStore } from '@/stores/propertiesStore'
import AppIconField from '@/components/wrappers/AppIconField.vue'
import AppInputIcon from '@/components/wrappers/AppInputIcon.vue'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'

const propertiesStore = usePropertiesStore()

const isSidebarCollapsed = ref(false)
const city = ref('')
const title = ref('')

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

onBeforeMount(async () => {
  await propertiesStore.getAllProperties()
})
</script>

<template>
  <div class="container">
    <div :class="['sidebar', { 'sidebar-collapsed': isSidebarCollapsed }]">
      <div class="flex flex-column p-2">
        <AppIconField iconPosition="right">
          <AppInputIcon>
            <i class="pi pi-map-marker" />
          </AppInputIcon>
          <AppInputText
            v-model="city"
            placeholder="Type your city or state"
            type="search"
            @keyup.enter="propertiesStore.getAllProperties({ city })"
          />
        </AppIconField>
      </div>
    </div>
    <div class="flex-1">
      <div class="top-bar">
        <i class="pi pi-sliders-h" @click="toggleSidebar" style="cursor: pointer" />
        <AppIconField iconPosition="left">
          <AppInputIcon>
            <i class="pi pi-search" />
          </AppInputIcon>
          <AppInputText
            v-model="title"
            placeholder="Type the property title"
            type="search"
            @keyup.enter="propertiesStore.getAllProperties({ title })"
          />
        </AppIconField>
      </div>
      <div class="properties">
        <header>
          <div>
            <h1>{{ $t('properties.list.title') }}</h1>
            <p>
              {{ $t('properties.list.description', { count: propertiesStore.properties.length }) }}
            </p>
          </div>
        </header>
        <main class="property-cards">
          <PropertyCard
            v-for="property in propertiesStore.properties"
            :key="property.id"
            :property
            show-footer
          />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  margin: -1.5rem;
}
.sidebar {
  flex: 0 0 calc(100vw / 7);
  height: calc(100vh - 64px);
  animation: slideIn 0.5s ease;
  padding: 1rem;
  background-color: var(--primary-bg-color);
}
.sidebar-collapsed {
  display: none;
}
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-bg-color);
  padding: 1rem;
}
.properties {
  padding: 2rem;
  height: calc(100vh - 134px);
  overflow-y: auto;
}
.property-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
