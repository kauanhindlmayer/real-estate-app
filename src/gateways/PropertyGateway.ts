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
  city?: string
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
  optionals?: string[]
}

export default class PropertyGateway implements IPropertyGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async getAll({ title, city }: IPropertyFilters): Promise<Property[]> {
    const urlParams = new URLSearchParams()
    if (title) urlParams.append('filterString', title)
    if (city) urlParams.append('filterString', city)
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

  async getAll({ title, city }: IPropertyFilters): Promise<Property[]> {
    const randomDelay = Math.floor(Math.random() * 3000) + 1000
    await new Promise((resolve) => setTimeout(resolve, randomDelay))

    if (title) {
      return this.properties.filter((property) => {
        return property.title.toLowerCase().includes(title.toLowerCase())
      })
    }
    if (city) {
      return this.properties.filter((property) => {
        return (
          property.location.city.toLowerCase().includes(city.toLowerCase()) ||
          property.location.state.toLowerCase().includes(city.toLowerCase())
        )
      })
    }
    return this.properties
  }

  async getById(id: string): Promise<Property> {
    return this.properties.find((property) => property.id === id)!
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
