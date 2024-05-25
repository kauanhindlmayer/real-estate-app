import type { App } from 'vue'
import AxiosAdapter from '@/gateways/httpClient'
import PropertyGateway, { PropertyGatewayInMemory } from '@/gateways/PropertyGateway'
import LocationGateway, { LocationGatewayInMemory } from '@/gateways/LocationGateway'
import UserGateway from '@/gateways/UserGateway'

interface IRegisterGatewaysOptions {
  useInMemory: boolean
}

export function registerGateways(
  app: App,
  options: IRegisterGatewaysOptions = { useInMemory: false }
) {
  const httpClient = new AxiosAdapter(import.meta.env.VITE_API_URL)

  let propertyGateway
  let locationGateway

  if (options.useInMemory) {
    propertyGateway = new PropertyGatewayInMemory()
    locationGateway = new LocationGatewayInMemory()
  } else {
    propertyGateway = new PropertyGateway(httpClient)
    locationGateway = new LocationGateway(httpClient)
  }

  const userGateway = new UserGateway(httpClient)

  app.provide('propertyGateway', propertyGateway)
  app.provide('userGateway', userGateway)
  app.provide('locationGateway', locationGateway)
}
