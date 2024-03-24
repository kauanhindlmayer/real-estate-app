import type Property from '@/types/models/Property'

interface IPropertyGateway {
  fetchProperties(): Promise<Property[]>
  fetchProperty(id: string): Promise<Property>
  createProperty(property: any): Promise<string>
  updateProperty(id: string, property: Property): Promise<string>
  deleteProperty(id: string): Promise<void>
}

class PropertyGateway implements IPropertyGateway {
  async fetchProperties() {
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
          'https://images.unsplash.com/photo-1605457701907-e9c039bed21f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8aG91c2V8fHx8fHwxNzExMzAxODk0&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150'
      },
      {
        id: 2,
        title: 'Cozy Mountain Retreat',
        description:
          'Escape to the mountains and enjoy cozy living in this beautiful mountain cabin.',
        price: 500000,
        size: 200,
        imageUrl:
          'https://images.unsplash.com/photo-1459535653751-d571815e906b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8aG91c2V8fHx8fHwxNzExMzAxOTgy&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150'
      },
      {
        id: 3,
        title: 'Modern Downtown Apartment',
        description:
          'Live in the heart of the city in this sleek and stylish apartment with all amenities nearby.',
        price: 300000,
        size: 120,
        imageUrl:
          'https://images.unsplash.com/photo-1593398395073-ae53c3870037?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8aG91c2V8fHx8fHwxNzExMzAxOTgz&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150'
      }
    ]
  }

  async fetchProperty(id: string) {
    return {
      id: 1,
      title: 'Property 1',
      description: 'Description for Property 1',
      price: 100000,
      size: 100,
      imageUrl:
        'https://images.unsplash.com/photo-1597211833712-5e41faa202ea?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8aG91c2V8fHx8fHwxNzExMzAxOTk4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150'
    }
  }

  async createProperty(property: any) {
    console.log('Property created')
    return '1'
  }

  async updateProperty(id: string, property: any) {
    console.log(`Property ${id} updated`)
    return id
  }

  async deleteProperty(id: string) {
    console.log(`Property ${id} deleted`)
  }
}

export default new PropertyGateway()
