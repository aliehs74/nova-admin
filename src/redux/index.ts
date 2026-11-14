import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { readSession } from '@/storage/session'
import type { IProduct, IUser } from '@/types/api'

const collections = createSlice({
  name: 'collections',
  initialState: { products: [] as IProduct[], users: [] as IUser[] },
  reducers: {
    appendProduct: (state, action: PayloadAction<IProduct>) => { state.products.push(action.payload) },
    appendUser: (state, action: PayloadAction<IUser>) => { state.users.push(action.payload) },
    clearCollections: state => { state.products = []; state.users = [] },
  },
})

const auth = createSlice({
  name: 'auth',
  initialState: { token: readSession() },
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => { state.token = action.payload },
  },
})

export const { setToken } = auth.actions
export const { appendProduct, appendUser, clearCollections } = collections.actions
const store = configureStore({ reducer: { auth: auth.reducer, collections: collections.reducer } })
export type TRootState = ReturnType<typeof store.getState>
export default store
