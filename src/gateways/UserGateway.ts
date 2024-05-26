import type IHttpClient from './httpClient'
import User from '@/types/models/User'

interface IUserGateway {
  register(userData: IUserData): Promise<void>
  login(email: string, password: string): Promise<User>
}

export interface IUserData {
  fullName: string
  email: string
  password: string
  passwordConfirmation: string
}

export default class UserGateway implements IUserGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async register(userData: IUserData): Promise<void> {
    return await this.httpClient.post('/user/one', userData)
  }

  async login(email: string, password: string): Promise<User> {
    return await this.httpClient.post('/login', { email, password })
  }
}
