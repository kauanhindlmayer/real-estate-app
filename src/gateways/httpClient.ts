import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import addAuthorizationHeader from '@/gateways/interceptors/addAuthorizationHeader'

type RequestConfig = AxiosRequestConfig

export default interface IHttpClient {
  get(url: string, config?: RequestConfig): Promise<any>
  post(url: string, data?: any, config?: RequestConfig): Promise<any>
  put(url: string, data?: any, config?: RequestConfig): Promise<any>
  delete(url: string, config?: RequestConfig): Promise<any>
}

export default class AxiosAdapter implements IHttpClient {
  private httpClient: AxiosInstance

  constructor() {
    this.httpClient = axios.create({ baseURL: import.meta.env.VITE_API_URL })
    this.httpClient.interceptors.request.use(addAuthorizationHeader)
  }

  async get(url: string, config?: RequestConfig): Promise<any> {
    const response = await this.httpClient.get(url, config)
    return response.data
  }

  async post(url: string, data?: any, config?: RequestConfig): Promise<any> {
    const response = await this.httpClient.post(url, data, config)
    return response.data
  }

  async put(url: string, data?: any, config?: RequestConfig): Promise<any> {
    const response = await this.httpClient.put(url, data, config)
    return response.data
  }

  async delete(url: string, config?: RequestConfig): Promise<any> {
    const response = await this.httpClient.delete(url, config)
    return response.data
  }
}
