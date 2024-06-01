import type IHttpClient from './httpClient'
import type Property from '@/types/models/Property'
import type { SellerTypeEnum } from '@/types/enums/SellerTypeEnum'
import { properties as mockProperties } from '@/data/properties.json'

interface IPropertyGateway {
  getAll(filters: IPropertyFilters): Promise<Property[]>
  getById(id: string): Promise<Property>
  save(property: Property): Promise<void>
  remove(id: string): Promise<void>
}

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

export default class PropertyGateway implements IPropertyGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async getAll(filters: IPropertyFilters): Promise<Property[]> {
    const urlParams = new URLSearchParams()

    for (const key in filters) {
      const value = filters[key as keyof IPropertyFilters]
      if (!value) continue
      if (Array.isArray(value)) {
        value.forEach((item: string) => urlParams.append(key, item))
      } else {
        urlParams.append(key, value as string)
      }
    }

    return await this.httpClient.get(`/property/all?${urlParams}`)
  }

  async getById(id: string): Promise<Property> {
    const urlParams = new URLSearchParams({ id })
    return await this.httpClient.get(`/property/oneById?${urlParams}`)
  }

  async save(property: Property): Promise<void> {
    const method = property.id ? 'put' : 'post'
    return await this.httpClient[method]('/property/one', property)
  }

  async remove(id: string): Promise<void> {
    return await this.httpClient.delete(`/property/one/${id}`)
  }
}

export class PropertyGatewayInMemory implements IPropertyGateway {
  private properties: Property[] = mockProperties

  async getAll(filters: IPropertyFilters): Promise<Property[]> {
    const { title, location } = filters
    return this.properties.filter(
      (property) =>
        (!title || property.title.includes(title)) &&
        (!location || property.location.city === location || property.location.state === location)
    )
  }

  async getById(id: string): Promise<Property> {
    const property = this.properties.find((property) => property.id === id)
    if (!property) throw new Error('Property not found')
    return property
  }

  async save(property: Property): Promise<void> {
    const index = this.properties.findIndex((p) => p.id === property.id)
    if (index === -1) {
      this.properties.push(property)
    } else {
      this.properties[index] = property
    }
  }

  async remove(id: string): Promise<void> {
    this.properties = this.properties.filter((property) => property.id !== id)
  }
}
