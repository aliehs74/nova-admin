export type TLocale = 'fa' | 'en'
export type TTheme = 'light' | 'dark'

export const readPreference = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export const writePreference = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    return
  }
}
