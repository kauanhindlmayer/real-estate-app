import axios from 'axios'

export default interface IHttpClient {
  get(url: string): Promise<any>
  post(url: string, data: any): Promise<any>
  put(url: string, data: any): Promise<any>
  delete(url: string): Promise<any>
}

export default class AxiosAdapter implements IHttpClient {
  baseUrl: string

  constructor(params: { baseUrl: string }) {
    this.baseUrl = params.baseUrl
  }

  async get(url: string): Promise<any> {
    const response = await axios.get(`${this.baseUrl}${url}`)
    return response.data
  }

  async post(url: string, data: any): Promise<any> {
    const response = await axios.post(`${this.baseUrl}${url}`, data)
    return response.data
  }

  async put(url: string, data: any): Promise<any> {
    const response = await axios.put(`${this.baseUrl}${url}`, data)
    return response.data
  }

  async delete(url: string): Promise<any> {
    const response = await axios.delete(`${this.baseUrl}${url}`)
    return response.data
  }
}
