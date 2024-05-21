import type IHttpClient from './httpClient'
import type Property from '@/types/models/Property'
import propertiesData from '@/data/properties.json'

interface IPropertyGateway {
  getAll(): Promise<Property[]>
  getById(id: string): Promise<Property>
  save(property: Property): Promise<void>
  remove(id: string): Promise<void>
}

export default class PropertyGateway implements IPropertyGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async getAll(): Promise<Property[]> {
    const properties = await this.httpClient.get('/property/all')
    return [...propertiesData, ...properties]
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
