import i18n from '@/plugins/i18n'
import { SellerTypeEnum } from '@/types/enums/SellerTypeEnum'
import type IPropertyFilters from '@/types/propertyFilters'
import toCamelCase from './toCamelCase'

const { t, n } = i18n.global

export const propertyTypesOptions = [
  { label: t('properties.list.filters.apartment'), value: 'apartment' },
  { label: t('properties.list.filters.house'), value: 'house' }
]

export const sellerTypesOptions = [
  {
    label: t('properties.list.filters.realEstateAgency'),
    value: SellerTypeEnum.REAL_ESTATE_AGENCY
  },
  {
    label: t('properties.list.filters.privateSeller'),
    value: SellerTypeEnum.PRIVATE_SELLER
  },
  {
    label: t('properties.list.filters.developer'),
    value: SellerTypeEnum.DEVELOPER
  },
  {
    label: t('properties.list.filters.builder'),
    value: SellerTypeEnum.BUILDER
  },
  {
    label: t('properties.list.filters.investor'),
    value: SellerTypeEnum.INVESTOR
  }
]

export const amenitiesOptions = [
  { label: t('properties.list.filters.garage'), value: 'garage' },
  { label: t('properties.list.filters.garden'), value: 'garden' },
  { label: t('properties.list.filters.pool'), value: 'pool' },
  { label: t('properties.list.filters.elevator'), value: 'elevator' },
  { label: t('properties.list.filters.terrace'), value: 'terrace' }
]

export const sortByOptions = [
  { label: t('properties.list.mostRelevant'), value: 'mostRelevant' },
  { label: t('properties.list.priceAscending'), value: 'priceLowToHigh' },
  { label: t('properties.list.priceDescending'), value: 'priceHighToLow' },
  { label: t('properties.list.newest'), value: 'newest' }
]

function getActiveFilters(filters: IPropertyFilters) {
  const activeFilters = Object.entries(filters).filter(([, value]) => {
    if (Array.isArray(value)) {
      return value.length > 0
    }
    return value
  })

  return activeFilters
}

interface FormatMap {
  [key: string]: (value: any) => string
}

const formatMap: FormatMap = {
  minYearBuilt: (value: Date) => value.getFullYear().toString(),
  maxYearBuilt: (value: Date) => value.getFullYear().toString(),
  minPrice: (value: number) => n(value, 'currency'),
  maxPrice: (value: number) => n(value, 'currency'),
  minSize: (value: number) => `${value}m²`,
  maxSize: (value: number) => `${value}m²`
}

function formatValue(key: string, value: any): string {
  const formatter = formatMap[key]

  if (formatter) {
    return formatter(value)
  } else if (Array.isArray(value)) {
    return value.map((v) => t(`properties.list.filters.${toCamelCase(v)}`)).join(', ')
  }

  return value
}

export function formatActiveFilters(filters: IPropertyFilters, maxFilters: number = 6): string[] {
  const activeFilters = getActiveFilters(filters)
  const formattedFilters = activeFilters.map(
    ([key, value]) => `${t(`properties.list.filters.${key}`)}: ${formatValue(key, value)}`
  )

  if (formattedFilters.length > maxFilters) {
    formattedFilters.splice(maxFilters, formattedFilters.length - maxFilters, '...')
  }

  return formattedFilters
}

export default {
  propertyTypesOptions,
  sellerTypesOptions,
  amenitiesOptions,
  sortByOptions,
  getActiveFilters,
  formatActiveFilters
}
