import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search, Plus, Trash2 } from 'lucide-react'
import type { TRootState } from '@/redux'
import type { IUser } from '@/types/api'
import { getUsers } from '@/utils/services'
import dictionary from '@/dictionary'
import routes from '@/routes'
import paginate from '@/utils/pagination'
import Button from '@/components/atoms/button'
import { Surface, Table, Pagination } from '@/shared/ui'

const Users = ({ locale }: { locale: 'fa' | 'en' }) => {
  const t = dictionary[locale]
  const navigate = useNavigate()
  const location = useLocation()
  const temporary = useSelector((state: TRootState) => state.collections.users)
  const [users, setUsers] = useState<IUser[]>([])
  const [state, setState] = useState<'loading' | 'error' | 'ready'>('loading')
  const [retry, setRetry] = useState(0)
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  useEffect(() => {
    const controller = new AbortController()
    getUsers(controller.signal).then(data => {
      if (!controller.signal.aborted) {
        setUsers(data)
        setState('ready')
      }
    }).catch(() => {
      if (!controller.signal.aborted) setState('error')
    })

    return () => controller.abort()
  }, [retry])
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQuery(search.trim().toLocaleLowerCase())
      setPage(1)
    }, 300)

    return () => window.clearTimeout(timer)
  }, [search])
  const dataset = [...temporary, ...users].filter(user => `${user.name.firstname} ${user.name.lastname} ${user.username} ${user.email}`.toLocaleLowerCase().includes(query))
  const result = paginate(dataset, page)
  const saved = typeof location.state === 'object' && location.state !== null && 'userSaved' in location.state && location.state.userSaved === true

  return (
    <>
      {saved && <p role="status">{t.userSaved}</p>}
      <div className="products-toolbar">
        <div className="product-search"><Search aria-hidden="true" size={20} /><input type="search" aria-label={t.searchUsers} placeholder={t.searchUsers} value={search} onChange={event => setSearch(event.target.value)} /></div>
        <Button className="add-product" onClick={() => navigate(routes.createUser)}>{t.createUser}<Plus aria-hidden="true" size={20} /></Button>
      </div>
      <Surface>
        {state === 'loading' ? <p role="status">{t.loading}</p> : state === 'error' ? <><p role="alert">{t.error}</p><Button onClick={() => { setState('loading'); setRetry(retry + 1) }}>{t.retry}</Button></> : !dataset.length ? <p role="status">{query ? t.noUserResults : t.empty}</p> : (
          <>
            <div className="table-scroll users-table">
              <Table><caption>{t.users}</caption><thead><tr>{[t.firstname, t.lastname, t.username, t.email, t.phone, t.actions].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead><tbody>{result.items.map(user => <tr key={user.id}><td dir="auto">{user.name.firstname}</td><td dir="auto">{user.name.lastname}</td><td><bdi>{user.username}</bdi></td><td><bdi>{user.email}</bdi></td><td><bdi>{user.phone}</bdi></td><td><button type="button" className="display-action delete-action" disabled aria-label={t.remove} title={t.remove}><Trash2 size={20} aria-hidden="true" /></button></td></tr>)}</tbody></Table>
            </div>
            <Pagination page={result.page} count={result.count} onChange={setPage} previous={t.previous} next={t.next} label={t.page} locale={locale} />
          </>
        )}
      </Surface>
    </>
  )
}

export default Users
