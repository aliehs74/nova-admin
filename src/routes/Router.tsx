import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { TRootState } from '@/redux'
import { clearCollections, setToken } from '@/redux'
import { isValidToken, saveSession } from '@/storage/session'
import { readPreference } from '@/shared/preferences'
import Login from '@/pages/login'
import DesignSystem from '@/DesignSystem'
import Button from '@/components/atoms/button'
import dictionary from '@/dictionary'
import routes from './index'

const Router = () => {
  const token = useSelector((state: TRootState) => state.auth.token)
  const dispatch = useDispatch()
  const locale = readPreference('nova-admin-locale') === 'en' ? 'en' : 'fa'
  const logout = () => { saveSession(null); dispatch(setToken(null)); dispatch(clearCollections()) }
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.dataset.theme = readPreference('nova-admin-theme') === 'dark' ? 'dark' : 'light'
    const timer = window.setInterval(() => {
      if (token && !isValidToken(token)) { saveSession(null); dispatch(setToken(null)); dispatch(clearCollections()) }
    }, 1000)

    return () => clearInterval(timer)
  }, [dispatch, locale, token])

  return (
    <Routes>
      <Route path={routes.login} element={token ? <Navigate to={routes.home} replace /> : <Login />} />
      <Route path={routes.home} element={token ? <><Button onClick={logout}>{dictionary[locale].logout}</Button><DesignSystem /></> : <Navigate to={routes.login} replace />} />
      <Route path="*" element={<Navigate to={routes.home} replace />} />
    </Routes>
  )
}

export default Router
