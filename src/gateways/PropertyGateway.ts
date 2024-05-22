import type IHttpClient from './httpClient'
import type Property from '@/types/models/Property'
import defaultProperties from '@/data/properties.json'

interface IPropertyGateway {
  getAll(): Promise<Property[]>
  getById(id: string): Promise<Property>
  save(property: Property): Promise<void>
  remove(id: string): Promise<void>
}

export default class PropertyGateway implements IPropertyGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async getAll(title?: string): Promise<Property[]> {
    const urlParams = new URLSearchParams()
    if (title) urlParams.append('filterString', title)
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
  private properties: Property[] = defaultProperties

  async getAll(title?: string): Promise<Property[]> {
    if (title) {
      return this.properties.filter((property) => {
        return property.title.toLowerCase().includes(title.toLowerCase())
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
