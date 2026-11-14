import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { TRootState } from '@/redux'
import { clearCollections, setToken } from '@/redux'
import { isValidToken, saveSession } from '@/storage/session'
import { readPreference } from '@/shared/preferences'
import Login from '@/pages/login'
import Homepage from '@/pages/homepage'
import routes from './index'

const Router = () => {
  const token = useSelector((state: TRootState) => state.auth.token)
  const dispatch = useDispatch()
  const locale = readPreference('nova-admin-locale') === 'en' ? 'en' : 'fa'
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
      {[routes.home, routes.products, routes.createProduct, routes.users, routes.createUser].map(path => <Route key={path} path={path} element={token ? <Homepage /> : <Navigate to={routes.login} replace />} />)}
      <Route path="*" element={<Navigate to={routes.home} replace />} />
    </Routes>
  )
}

export default Router
