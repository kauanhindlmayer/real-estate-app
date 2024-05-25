import { defineStore } from 'pinia'
import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useBaseToast from '@/composables/useBaseToast'
import type Property from '@/types/models/Property'
import type PropertyGateway from '@/gateways/PropertyGateway'
import type { IPropertyFilters } from '@/gateways/PropertyGateway'

export const usePropertiesStore = defineStore('properties', () => {
  const propertyGateway = inject('propertyGateway') as PropertyGateway

  const toast = useBaseToast()
  const router = useRouter()
  const { t } = useI18n()

  const isLoading = ref(false)
  const property = ref<Property | null>(null)
  const properties = ref<Property[]>([])

  const propertiesCount = computed(() => properties.value.length)

  async function saveProperty(property: Property) {
    isLoading.value = true
    try {
      await propertyGateway.save(property)
      toast.success({ message: t('properties.form.messages.propertyCreated') })
      router.push({ name: 'properties-list' })
    } catch {
      toast.error({ message: t('properties.form.messages.errorSavingProperty') })
    } finally {
      isLoading.value = false
    }
  }

  async function getPropertyById(id: string) {
    isLoading.value = true
    try {
      property.value = await propertyGateway.getById(id)
    } catch {
      toast.error({ message: t('properties.list.messages.errorFetchingProperty') })
    } finally {
      isLoading.value = false
    }
  }

  async function getAllProperties(filters: IPropertyFilters = {}) {
    isLoading.value = true
    try {
      properties.value = await propertyGateway.getAll(filters)
    } catch {
      toast.error({ message: t('properties.list.messages.errorFetchingProperties') })
    } finally {
      isLoading.value = false
    }
  }

  return {
    /* State */
    isLoading,
    property,
    properties,
    /* Getters */
    propertiesCount,
    /* Actions */
    saveProperty,
    getPropertyById,
    getAllProperties
  }
})
