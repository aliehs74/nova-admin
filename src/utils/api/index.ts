import axios from 'axios'
import type { IApiError } from '@/types/api'
import { readSession } from '@/storage/session'
import { saveSession } from '@/storage/session'
import store, { setToken, clearCollections } from '@/redux'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

api.interceptors.response.use(response => response, (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.status === 401 && error.config?.url !== '/auth/login') {
    saveSession(null)
    store.dispatch(setToken(null))
    store.dispatch(clearCollections())
  }
  return Promise.reject(error)
})

api.interceptors.request.use((config) => {
  const token = readSession()
  if (token && config.url !== '/auth/login') config.headers.Authorization = `Bearer ${token}`
  return config
})

export const normalizeError = (error: unknown): IApiError => {
  if (axios.isCancel(error)) return { kind: 'cancelled' }
  if (!axios.isAxiosError(error)) return { kind: 'validation' }
  const status = error.response?.status
  return {
    kind: status === 401 ? 'unauthorized' : status === 400 || status === 422 ? 'validation' : status ? 'server' : 'network',
    status,
    code: error.code,
  }
}

export default api
