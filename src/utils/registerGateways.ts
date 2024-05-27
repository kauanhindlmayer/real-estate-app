import type { App } from 'vue'
import AxiosAdapter from '@/gateways/httpClient'
import PropertyGateway, { PropertyGatewayInMemory } from '@/gateways/PropertyGateway'
import LocationGateway, { LocationGatewayInMemory } from '@/gateways/LocationGateway'
import UserGateway, { UserGatewayInMemory } from '@/gateways/UserGateway'

interface IRegisterGatewaysOptions {
  useInMemory: boolean
}

export function registerGateways(
  app: App,
  options: IRegisterGatewaysOptions = { useInMemory: false }
) {
  const { useInMemory } = options
  const httpClient = new AxiosAdapter(import.meta.env.VITE_API_URL)
  const propertyGateway = useInMemory
    ? new PropertyGatewayInMemory()
    : new PropertyGateway(httpClient)
  const userGateway = useInMemory ? new UserGatewayInMemory() : new UserGateway(httpClient)
  const locationGateway = useInMemory
    ? new LocationGatewayInMemory()
    : new LocationGateway(httpClient)
  app.provide('propertyGateway', propertyGateway)
  app.provide('userGateway', userGateway)
  app.provide('locationGateway', locationGateway)
}
