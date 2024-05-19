<script lang="ts" setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import Property from '@/types/models/Property'
import PropertyGateway from '@/gateways/PropertyGateway'
import LocationGateway from '@/gateways/LocationGateway'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppButton from '@/components/wrappers/AppButton.vue'
import { useLoadingStore } from '@/stores/LoadingStore'

const propertyGateway = inject('propertyGateway') as PropertyGateway
const locationGateway = inject('locationGateway') as LocationGateway

const router = useRouter()
const loadingStore = useLoadingStore()

const property = ref<Property>(new Property())

const saveProperty = async () => {
  loadingStore.startLoading()
  try {
    await propertyGateway.save(property.value)
    router.push({ path: '/properties' })
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.stopLoading()
  }
}

const getLocationByZipCode = async () => {
  loadingStore.startLoading()
  try {
    const location = await locationGateway.getByZipCode(property.value.location.zipCode)
    property.value.location = location
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.stopLoading()
  }
}
</script>

<template>
  <div class="container">
    <h1 class="pageTitle">New Property</h1>
    <div class="form-container">
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
          <AppInputText v-model="property.price" placeholder="Price" id="price" />
        </div>

        <div class="p-field">
          <label for="size">Size</label>
          <AppInputText v-model="property.size" placeholder="Size" id="size" />
        </div>

        <div class="p-field">
          <label for="imageUrl">Image URL</label>
          <AppInputText v-model="property.imageUrl" placeholder="Image URL" id="imageUrl" />
        </div>

        <h2>Location</h2>
        <div class="p-field">
          <label for="zipCode">Zip Code</label>
          <AppInputText
            v-model="property.location.zipCode"
            placeholder="Zip Code"
            id="zipCode"
            @change="getLocationByZipCode"
          />
        </div>

        <div class="p-field">
          <label for="address">Address</label>
          <AppInputText v-model="property.location.address" placeholder="Address" id="address" />
        </div>

        <div class="p-field">
          <label for="city">City</label>
          <AppInputText v-model="property.location.city" placeholder="City" id="city" />
        </div>

        <div class="p-field">
          <label for="state">State</label>
          <AppInputText v-model="property.location.state" placeholder="State" id="state" />
        </div>

        <div class="p-field">
          <label for="country">Country</label>
          <AppInputText v-model="property.location.country" placeholder="Country" id="country" />
        </div>

        <AppButton label="Save" class="mt-4" @click="saveProperty" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.form-container {
  width: 35%;
}
.p-field {
  margin-bottom: 10px;
}
</style>
