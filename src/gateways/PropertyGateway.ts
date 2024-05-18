import type Property from '@/types/models/Property'
import propertiesData from '@/data/properties.json'
import axios from 'axios'

interface IPropertyGateway {
  getAll(): Promise<Property[]>
  getById(id: string): Promise<Property>
  save(property: Property): Promise<void>
  remove(id: string): Promise<void>
}

class PropertyGateway implements IPropertyGateway {
  async getAll(): Promise<Property[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return propertiesData
  }

  async getById(id: string): Promise<Property> {
    return propertiesData.find((property) => property.id === id) as Property
  }

  async save(property: Property): Promise<void> {
    const method = property.id ? 'put' : 'post'
    return await axios[method]('http://localhost:8070/property/one', property)
  }

  async remove(id: string) {
    console.log(`Property ${id} deleted`)
  }
}

export default new PropertyGateway()
