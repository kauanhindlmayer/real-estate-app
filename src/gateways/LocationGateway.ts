import type IHttpClient from './httpClient'
import Location from '@/types/models/Location'
import defaultLocations from '@/data/locations.json'

interface ILocationGateway {
  getByZipCode(zipCode: string): Promise<Location>
}

export default class LocationGateway implements ILocationGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async getByZipCode(zipCode: string): Promise<Location> {
    const urlParams = new URLSearchParams({ zipCode })
    return await this.httpClient.get(`/location/oneByZipCode?${urlParams}`)
  }
}

export class LocationGatewayInMemory implements ILocationGateway {
  locations: Location[] = defaultLocations

  async getByZipCode(zipCode: string): Promise<Location> {
    return defaultLocations.find((location) => location.zipCode === zipCode)!
  }
}
