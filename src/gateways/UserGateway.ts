import type IHttpClient from './httpClient'
import User from '@/types/models/User'

export interface IUserGateway {
  register(registrationData: RegistrationRequest): Promise<void>
  login(loginData: LoginRequest): Promise<User>
  getUserInfo(): Promise<User>
}

export type RegistrationRequest = {
  fullName: string
  email: string
  password: string
  passwordConfirmation: string
}

export type LoginRequest = {
  username: string
  password: string
}

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

export default class UserGateway implements IUserGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async register(registrationData: RegistrationRequest): Promise<void> {
    return await this.httpClient.post('/users/register', registrationData, config)
  }

  async login(loginData: LoginRequest): Promise<User> {
    return await this.httpClient.post('/login', new URLSearchParams(loginData), config)
  }

  async getUserInfo(): Promise<User> {
    return await this.httpClient.get('/users/me')
  }
}

export class UserGatewayInMemory implements IUserGateway {
  private users: User[] = []

  async register({ fullName, email, password }: RegistrationRequest): Promise<void> {
    if (this.users.find((user) => user.email === email)) {
      throw new Error('User already exists')
    }
    const user = new User(fullName, email, '', '', password, String(this.users.length + 1))
    this.users.push(user)
  }

  async login({ username, password }: LoginRequest): Promise<User> {
    const user = this.users.find((user) => user.email === username && user.password === password)
    if (!user) throw new Error('Invalid credentials')
    return user
  }

  getUserInfo(): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
