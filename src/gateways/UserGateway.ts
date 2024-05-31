import type IHttpClient from './httpClient'
import User from '@/types/models/User'

interface IUserGateway {
  register(registrationData: RegistrationRequest): Promise<void>
  login(loginData: LoginRequest): Promise<User>
}

export type RegistrationRequest = {
  fullName: string
  email: string
  password: string
  passwordConfirmation: string
}

export type LoginRequest = {
  email: string
  password: string
}

export default class UserGateway implements IUserGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async register(registrationData: RegistrationRequest): Promise<void> {
    return await this.httpClient.post('/user/one', registrationData)
  }

  async login(loginData: LoginRequest): Promise<User> {
    return await this.httpClient.post('/login', loginData)
  }
}

export class UserGatewayInMemory implements IUserGateway {
  private users: User[] = []

  async register(registrationData: RegistrationRequest): Promise<void> {
    if (this.users.find((user) => user.email === registrationData.email)) {
      throw new Error('User already exists')
    }
    const user = new User(
      registrationData.fullName,
      registrationData.email,
      registrationData.password,
      'https://placehold.co/200x200',
      this.users.length + 1
    )
    this.users.push(user)
  }

  async login(loginData: LoginRequest): Promise<User> {
    const user = this.users.find((user) => {
      return user.email === loginData.email && user.password === loginData.password
    })
    if (!user) throw new Error('User not found')
    return user
  }
}
