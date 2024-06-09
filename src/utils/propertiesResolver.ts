import { t } from '@/plugins/i18n'
import { SellerTypeEnum } from '@/types/enums/SellerTypeEnum'

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

export default {
  propertyTypesOptions,
  sellerTypesOptions,
  amenitiesOptions,
  sortByOptions
}
