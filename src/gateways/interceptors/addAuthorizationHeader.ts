import type { InternalAxiosRequestConfig } from 'axios'

function getToken() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user?.accessToken
}

function addAuthorizationHeader(config: InternalAxiosRequestConfig) {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

export default addAuthorizationHeader
