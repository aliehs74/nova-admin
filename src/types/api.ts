export interface IProduct {
  id: number
  title: string
  description: string
  price: number
  category: string
  image: string
  rating?: { rate: number; count: number }
}

export interface IUser {
  id: number
  email: string
  username: string
  name: { firstname: string; lastname: string }
  phone: string
}

export type TCreateProduct = Omit<IProduct, 'id' | 'rating'>
export type TCreateUser = Omit<IUser, 'id'> & { password: string }
export type TLoginPayload = { username: string; password: string }
export type TLoginResponse = { token: string }
export type TApiErrorKind = 'network' | 'server' | 'validation' | 'unauthorized' | 'cancelled'
export interface IApiError {
  kind: TApiErrorKind
  status?: number
  code?: string
}
