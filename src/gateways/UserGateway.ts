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

export class UserGatewayInMemory implements IUserGateway {
  private users: User[] = []

  async register(userData: IUserData): Promise<void> {
    if (this.users.find((user) => user.email === userData.email)) {
      throw new Error('User already exists')
    }
    const user = new User(
      userData.fullName,
      userData.email,
      userData.password,
      'https://placehold.co/200x200',
      this.users.length + 1
    )
    this.users.push(user)
  }

  async login(email: string, password: string): Promise<User> {
    const user = this.users.find((user) => user.email === email && user.password === password)
    if (!user) throw new Error('User not found')
    return user
  }
}
