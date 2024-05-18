import Location from '@/types/models/Location'
import axios from 'axios'

interface ILocationGateway {
  getByZipCode(zipCode: string): Promise<Location>
}

class LocationGateway implements ILocationGateway {
  async getByZipCode(zipCode: string): Promise<Location> {
    const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
    const {
      logradouro: address,
      localidade: city,
      uf: state,
      pais: country = 'Brazil'
    } = response.data
    return new Location(address, city, state, country, zipCode)
  }
}

export default new LocationGateway()
