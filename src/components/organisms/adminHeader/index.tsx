import { useState } from 'react'
import { Bell, Menu, UserRound } from 'lucide-react'
import dictionary from '@/dictionary'

const AdminHeader = ({ locale, sidebarOpen, onToggle }: { locale: 'fa' | 'en'; sidebarOpen: boolean; onToggle: () => void }) => {
  const [open, setOpen] = useState(false)
  const t = dictionary[locale]

  return (
    <header className="admin-header">
      <div className="admin-greeting"><UserRound aria-hidden="true" />{t.greeting}</div>
      <div className="header-controls">
        <div className="notifications" onKeyDown={event => { if (event.key === 'Escape') setOpen(false) }}>
          <button type="button" aria-label={t.notifications} aria-expanded={open} onClick={() => setOpen(!open)}><Bell aria-hidden="true" /></button>
          {open && <div className="notification-list"><strong>{t.demoNotifications}</strong><p>{t.productNotification}</p><p>{t.userNotification}</p></div>}
        </div>
        <button type="button" aria-label={t.toggleSidebar} aria-expanded={sidebarOpen} onClick={onToggle}><Menu aria-hidden="true" /></button>
      </div>
    </header>
  )
}

export default AdminHeader
