import i18n from '@/plugins/i18n'
import { SellerTypeEnum } from '@/types/enums/SellerTypeEnum'

const { t } = i18n.global

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
  { label: t('properties.list.filters.hasGarage'), value: 'hasGarage' },
  { label: t('properties.list.filters.hasGarden'), value: 'hasGarden' },
  { label: t('properties.list.filters.hasPool'), value: 'hasPool' },
  { label: t('properties.list.filters.hasElevator'), value: 'hasElevator' },
  { label: t('properties.list.filters.hasTerrace'), value: 'hasTerrace' }
]

export const sortByOptions = [
  { label: t('properties.list.mostRelevant'), value: 'mostRelevant' },
  { label: t('properties.list.priceAscending'), value: 'priceLowToHigh' },
  { label: t('properties.list.priceDescending'), value: 'priceHighToLow' },
  { label: t('properties.list.newest'), value: 'newest' }
]

export default {
  propertyTypesOptions,
  sellerTypesOptions,
  amenitiesOptions,
  sortByOptions
}
