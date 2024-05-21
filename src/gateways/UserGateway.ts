import type IHttpClient from './httpClient'
import User from '@/types/models/User'

interface IUserGateway {
  register(user: User): Promise<void>
  login(email: string, password: string): Promise<void>
}

export default class UserGateway implements IUserGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async register(user: User): Promise<void> {
    return await this.httpClient.post('/user/one', user)
  }

  async login(email: string, password: string): Promise<void> {
    return await this.httpClient.post('/login', { email, password })
  }
}
