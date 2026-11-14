import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { House, Package, Users, UserRound, Moon, Sun } from 'lucide-react'
import { setToken, clearCollections } from '@/redux'
import { saveSession } from '@/storage/session'
import dictionary from '@/dictionary'
import routes from '@/routes'
import Button from '@/components/atoms/button'
import IconProvider from '@/utils/iconProvider'
import { Row } from '@/shared/ui'
import { SidebarBottom } from '@/pages/homepage/index.styles'
type TProps = { locale: 'fa' | 'en' }
const Sidebar = ({ locale, dark, setLocale, setDark }: TProps & { dark: boolean; setLocale: (locale: 'fa' | 'en') => void; setDark: (dark: boolean) => void }) => {
const t = dictionary[locale]
const dispatch = useDispatch()
return (
      <aside>
        <NavLink to={routes.home} dir="ltr" className="sidebar-brand">NOVA <IconProvider iconName="novaBag" color="#ed6c18" /></NavLink>
        <nav aria-label={t.navigation}>
          <NavLink to={routes.home} end><House size={22} aria-hidden="true" />{t.dashboard}</NavLink>
          <NavLink to={routes.products}><Package size={22} aria-hidden="true" />{t.products}</NavLink>
          <NavLink to={routes.users}><Users size={22} aria-hidden="true" />{t.users}</NavLink>
        </nav>
        <SidebarBottom>
          <Row>
            <div className="theme-switch" dir="ltr">
              <button type="button" aria-label={t.dark} title={t.dark} aria-pressed={dark} onClick={() => setDark(true)}><Moon size={19} fill="currentColor" aria-hidden="true" /></button>
              <button type="button" aria-label={t.light} title={t.light} aria-pressed={!dark} onClick={() => setDark(false)}><Sun size={20} aria-hidden="true" /></button>
            </div>
            <div className="language-switch" dir="ltr">
              <button type="button" lang="fa" aria-label="فارسی" aria-pressed={locale === 'fa'} onClick={() => setLocale('fa')}>FA</button>
              <span aria-hidden="true">|</span>
              <button type="button" lang="en" aria-label="English" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
            </div>
          </Row>
          <Row><UserRound aria-hidden="true" size={24} /><span>{t.admin}</span></Row>
          <Button onClick={() => { saveSession(null); dispatch(setToken(null)); dispatch(clearCollections()) }}>{t.logout}</Button>
        </SidebarBottom>
      </aside>
)
}
export default Sidebar
