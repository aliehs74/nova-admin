const key = 'nova-admin-session-v1'

export const isValidToken = (token: unknown): token is string => {
  if (typeof token !== 'string') return false
  try {
    const part = token.split('.')[1]
    if (!part) return false
    const payload: unknown = JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/')))
    return typeof payload === 'object' && payload !== null
      && (!('exp' in payload) || (typeof payload.exp === 'number' && payload.exp * 1000 > Date.now()))
  } catch {
    return false
  }
}

export const readSession = (): string | null => {
  try {
    const token = sessionStorage.getItem(key)
    if (isValidToken(token)) return token
    sessionStorage.removeItem(key)
  } catch {
    return null
  }
  return null
}

export const saveSession = (token: string | null) => {
  try {
    if (token) sessionStorage.setItem(key, token)
    else sessionStorage.removeItem(key)
  } catch {
    return
  }
}
