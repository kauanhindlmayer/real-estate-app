import User from '@/types/models/User'
import axios from 'axios'

interface IUserGateway {
  register(user: User): Promise<void>
  login(email: string, password: string): Promise<void>
}

class UserGateway implements IUserGateway {
  async register(user: User): Promise<void> {
    return await axios.post('/user/one', user)
  }

  async login(email: string, password: string): Promise<void> {
    return await axios.post('/login', { email, password })
  }
}

export default new UserGateway()
