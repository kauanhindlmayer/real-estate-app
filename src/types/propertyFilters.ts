import type { SellerTypeEnum } from '@/types/enums/SellerTypeEnum'

export interface IPropertyFilters {
  title?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  minYearBuilt?: number
  maxYearBuilt?: number
  minSize?: number
  maxSize?: number
  minBedrooms?: number
  minBathrooms?: number
  sellerTypes?: SellerTypeEnum[]
  sortBy?: string
  amenities?: string[]
}
