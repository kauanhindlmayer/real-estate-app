import type IHttpClient from './httpClient'
import Location from '@/types/models/Location'

interface ILocationGateway {
  getByZipCode(zipCode: string): Promise<Location>
}

export default class LocationGateway implements ILocationGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async getByZipCode(zipCode: string): Promise<Location> {
    const response = await this.httpClient.get(`${zipCode}/json`)
    const { logradouro: address, localidade: city, uf: state, pais: country = 'Brazil' } = response
    return new Location(address, city, state, country, zipCode)
  }
}
