import type { App } from 'vue'
import AxiosAdapter from '@/gateways/httpClient'
import PropertyGateway, {
  PropertyGatewayInMemory,
  type IPropertyGateway
} from '@/gateways/PropertyGateway'
import LocationGateway, {
  type ILocationGateway,
  LocationGatewayInMemory
} from '@/gateways/LocationGateway'
import UserGateway, { UserGatewayInMemory, type IUserGateway } from '@/gateways/UserGateway'

type RegisterGatewaysConfig = {
  useInMemory: boolean
}

function registerGateways(app: App, { useInMemory = false }: RegisterGatewaysConfig) {
  const httpClient = new AxiosAdapter()
  const propertyGateway = useInMemory
    ? new PropertyGatewayInMemory()
    : new PropertyGateway(httpClient)
  const userGateway = useInMemory ? new UserGatewayInMemory() : new UserGateway(httpClient)
  const locationGateway = useInMemory
    ? new LocationGatewayInMemory()
    : new LocationGateway(httpClient)
  app.provide<IPropertyGateway>('propertyGateway', propertyGateway)
  app.provide<IUserGateway>('userGateway', userGateway)
  app.provide<ILocationGateway>('locationGateway', locationGateway)
}

export default registerGateways
