import type { InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/userStore'

function addAuthorizationHeader(config: InternalAxiosRequestConfig) {
  const userStore = useUserStore()
  const token = userStore.user?.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

export default addAuthorizationHeader
