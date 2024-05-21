import type IHttpClient from './httpClient'
import User from '@/types/models/User'

interface IUserGateway {
  register(email: string, password: string): Promise<void>
  login(email: string, password: string): Promise<User>
}

export default class UserGateway implements IUserGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async register(email: string, password: string): Promise<void> {
    return await this.httpClient.post('/user/one', { email, password })
  }

  async login(email: string, password: string): Promise<User> {
    return await this.httpClient.post('/login', { email, password })
  }
}
