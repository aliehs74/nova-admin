import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { readPreference, writePreference } from '@/shared/preferences'
import AdminHeader from '@/components/organisms/adminHeader'
import routes from '@/routes'
import Sidebar from '@/components/organisms/sidebar'
import Products from '@/pages/products'
import CreateProduct from '@/pages/createProduct'
import Dashboard from '@/pages/dashboard'
import Users from '@/pages/users'
import CreateUser from '@/pages/createUser'
import { Shell } from './index.styles'
const Homepage = () => {
  const [locale, setLocale] = useState<'fa' | 'en'>(() => readPreference('nova-admin-locale') === 'en' ? 'en' : 'fa')
  const [dark, setDark] = useState(() => readPreference('nova-admin-theme') === 'dark')
  const [sidebarOpen, setSidebarOpen] = useState(true)
const location = useLocation()
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    writePreference('nova-admin-locale', locale)
    writePreference('nova-admin-theme', dark ? 'dark' : 'light')
  }, [locale, dark])
return (<Shell className={sidebarOpen ? '' : 'sidebar-closed'}>{sidebarOpen && <Sidebar locale={locale} dark={dark} setLocale={setLocale} setDark={setDark} />}<AdminHeader locale={locale} sidebarOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} /><main>{location.pathname === routes.createUser ? <CreateUser locale={locale} /> : location.pathname === routes.users ? <Users locale={locale} /> : location.pathname === routes.createProduct ? <CreateProduct locale={locale} /> : location.pathname === routes.products ? <Products locale={locale} /> : <Dashboard locale={locale} />}</main></Shell>)
}
export default Homepage
