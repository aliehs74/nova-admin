import { NavLink, useLocation } from 'react-router-dom'
import dictionary from '@/dictionary'
import routes from '@/routes'
import { Surface } from '@/shared/ui'
type TProps = { locale: 'fa' | 'en' }
const Dashboard = ({ locale }: TProps) => {
const t = dictionary[locale]
const location = useLocation()
return (<Surface><h2>{t.dashboard}</h2><p>{location.pathname.startsWith(routes.users) ? t.usersPending : t.welcome}</p><NavLink to={routes.products}>{t.products}</NavLink></Surface>)
}
export default Dashboard
