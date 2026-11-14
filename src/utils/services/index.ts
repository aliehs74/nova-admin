import api, { normalizeError } from '@/utils/api'
import type { IProduct, IUser, TCreateProduct, TCreateUser, TLoginPayload, TLoginResponse } from '@/types/api'
import store, { appendProduct, appendUser } from '@/redux'

const request = async <T>(operation: () => Promise<{ data: T }>): Promise<T> => {
  try {
    return (await operation()).data
  } catch (error) {
    throw normalizeError(error)
  }
}

export const getProducts = (signal?: AbortSignal) => request(() => api.get<IProduct[]>('/products', { signal }))
export const getProduct = (id: number, signal?: AbortSignal) => request(() => api.get<IProduct>(`/products/${id}`, { signal }))
export const getCategories = (signal?: AbortSignal) => request(() => api.get<string[]>('/products/categories', { signal }))
export const createProduct = async (payload: TCreateProduct) => {
  const response = await request(() => api.post<IProduct>('/products', payload))
  const product = { ...payload, ...response, id: -Date.now() }
  store.dispatch(appendProduct(product))
  return product
}
export const getUsers = (signal?: AbortSignal) => request(() => api.get<IUser[]>('/users', { signal }))
export const createUser = async (payload: TCreateUser) => {
  const response = await request(() => api.post<{ id: number }>('/users', payload))
  const user: IUser = { id: -Date.now(), email: payload.email, username: payload.username, name: payload.name, phone: payload.phone }
  if (!Number.isFinite(response.id)) throw { kind: 'validation' }
  store.dispatch(appendUser(user))
  return user
}
export const login = (payload: TLoginPayload) => request(() => api.post<TLoginResponse>('/auth/login', payload))
