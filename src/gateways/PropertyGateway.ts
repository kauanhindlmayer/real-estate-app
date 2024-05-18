import type Property from '@/types/models/Property'
import axios from 'axios'

interface IPropertyGateway {
  getAll(): Promise<Property[]>
  getById(id: number): Promise<Property>
  save(property: Property): Promise<void>
  remove(id: number): Promise<void>
}

class PropertyGateway implements IPropertyGateway {
  async getAll(): Promise<Property[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return [
      {
        id: 1,
        title: 'Luxurious Villa with Ocean View',
        description:
          'Experience luxury living with breathtaking ocean views in this stunning villa.',
        price: 1000000,
        size: 350,
        imageUrl:
          'https://images.unsplash.com/photo-1605457701907-e9c039bed21f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8aG91c2V8fHx8fHwxNzExMzAxODk0&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150',
        location: {
          id: 1,
          address: '123 Ocean Drive',
          city: 'Miami',
          state: 'FL',
          country: 'USA',
          zipCode: '33101'
        }
      },
      {
        id: 2,
        title: 'Cozy Mountain Retreat',
        description:
          'Escape to the mountains and enjoy cozy living in this beautiful mountain cabin.',
        price: 500000,
        size: 200,
        imageUrl:
          'https://images.unsplash.com/photo-1459535653751-d571815e906b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8aG91c2V8fHx8fHwxNzExMzAxOTgy&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150',
        location: {
          id: 2,
          address: '456 Mountain Road',
          city: 'Denver',
          state: 'CO',
          country: 'USA',
          zipCode: '80202'
        }
      },
      {
        id: 3,
        title: 'Modern Downtown Apartment',
        description:
          'Live in the heart of the city in this sleek and stylish apartment with all amenities nearby.',
        price: 300000,
        size: 120,
        imageUrl:
          'https://images.unsplash.com/photo-1593398395073-ae53c3870037?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8aG91c2V8fHx8fHwxNzExMzAxOTgz&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150',
        location: {
          id: 3,
          address: '789 Downtown Blvd',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          zipCode: '10001'
        }
      }
    ]
  }

  async getById(id: number): Promise<Property> {
    return [
      {
        id: 1,
        title: 'Property 1',
        description: 'Description for Property 1',
        price: 100000,
        size: 100,
        imageUrl:
          'https://images.unsplash.com/photo-1597211833712-5e41faa202ea?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8aG91c2V8fHx8fHwxNzExMzAxOTk4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150',
        location: {
          id: 1,
          address: '123 Ocean Drive',
          city: 'Miami',
          state: 'FL',
          country: 'USA',
          zipCode: '33101'
        }
      }
    ].filter((property) => property.id === id)[0]
  }

  async save(property: Property): Promise<void> {
    const method = property.id ? 'put' : 'post'
    return await axios[method]('http://localhost:8070/property/one', property)
  }

  async remove(id: number) {
    console.log(`Property ${id} deleted`)
  }
}

export default new PropertyGateway()
