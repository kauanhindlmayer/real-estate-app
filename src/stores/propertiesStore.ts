import { defineStore } from 'pinia'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLoadingStore } from '@/stores/loadingStore'
import useBaseToast from '@/composables/useBaseToast'
import type Property from '@/types/models/Property'
import type PropertyGateway from '@/gateways/PropertyGateway'
import type { IPropertyFilters } from '@/gateways/PropertyGateway'

export const usePropertiesStore = defineStore('properties', () => {
  const propertyGateway = inject('propertyGateway') as PropertyGateway

  const loadingStore = useLoadingStore()
  const toast = useBaseToast()
  const router = useRouter()
  const { t } = useI18n()

  const property = ref<Property | null>(null)
  const properties = ref<Property[]>([])

  async function saveProperty(property: Property) {
    loadingStore.startLoading()
    try {
      await propertyGateway.save(property)
      toast.success({ message: t('properties.form.messages.propertyCreated') })
      router.push({ name: 'properties-list' })
    } catch {
      toast.error({ message: t('properties.form.messages.errorSavingProperty') })
    } finally {
      loadingStore.stopLoading()
    }
  }

  async function getPropertyById(id: string) {
    loadingStore.startLoading()
    try {
      property.value = await propertyGateway.getById(id)
    } catch {
      toast.error({ message: t('properties.list.messages.errorFetchingProperty') })
    } finally {
      loadingStore.stopLoading()
    }
  }

  async function getAllProperties(filters: IPropertyFilters = {}) {
    loadingStore.startLoading()
    try {
      properties.value = await propertyGateway.getAll(filters)
    } catch {
      toast.error({ message: t('properties.list.messages.errorFetchingProperties') })
    } finally {
      loadingStore.stopLoading()
    }
  }

  return {
    /* State */
    property,
    properties,
    /* Actions */
    saveProperty,
    getPropertyById,
    getAllProperties
  }
})
