import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '@/shared/theme'
import dictionary from '@/dictionary'
import { readPreference, writePreference } from '@/shared/preferences'
import type { TLocale, TTheme } from '@/shared/preferences'
import { Dialog, Feedback, Pagination, PasswordInput, Row, Select, Stack, Surface, Table } from '@/shared/ui'
import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'
import IconProvider from '@/utils/iconProvider'

const DesignSystem = () => {
  const [locale, setLocale] = useState<TLocale>(() => readPreference('nova-admin-locale') === 'en' ? 'en' : 'fa')
  const [mode, setMode] = useState<TTheme>(() => readPreference('nova-admin-theme') === 'dark' ? 'dark' : 'light')
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const t = dictionary[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
    writePreference('nova-admin-locale', locale)
  }, [locale])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    writePreference('nova-admin-theme', mode)
  }, [mode])

  return (
    <ThemeProvider theme={theme}>
      <main id="design-system">
        <Stack>
          <Surface as="header">
            <Row>
              <strong dir="ltr">NOVA <IconProvider iconName="novaBag" color="#c74600" /></strong>
              <Button customVariant="secondary" onClick={() => setLocale(locale === 'fa' ? 'en' : 'fa')}>{t.language}</Button>
              <Button customVariant="secondary" aria-pressed={mode === 'dark'} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>{t.theme}</Button>
            </Row>
            <h1>{t.title}</h1>
            <p>{t.description}</p>
          </Surface>
          <Surface>
            <Stack>
              <Input label={t.name} placeholder={t.name} />
              <PasswordInput label={t.password} showLabel={t.show} hideLabel={t.hide} />
              <Input label={t.search} type="search" placeholder={t.search} />
              <Select label={t.category}><option>{t.all}</option><option>{t.products}</option><option>{t.users}</option></Select>
              <Row>
                <Button onClick={() => setOpen(true)}>{t.open}</Button>
                <Button customVariant="secondary">{t.cancel}</Button>
                <Button disabled>{t.save}</Button>
              </Row>
            </Stack>
          </Surface>
          <Surface>
            <Table>
              <caption>{t.products}</caption>
              <thead><tr><th scope="col">{t.name}</th><th scope="col">{t.status}</th></tr></thead>
              <tbody><tr><td dir="ltr">NOVA</td><td>{t.active}</td></tr></tbody>
            </Table>
            <Pagination page={page} count={3} onChange={setPage} previous={t.previous} next={t.next} label={t.page} locale={locale} />
          </Surface>
          <Surface>
            <Feedback>{t.loading}</Feedback>
            <Feedback>{t.empty}</Feedback>
            <Feedback customVariant="alert">{t.error}</Feedback>
            <Feedback>{t.success}</Feedback>
          </Surface>
        </Stack>
        <Dialog open={open} onClose={() => setOpen(false)} title={t.dialog} closeLabel={t.close}>
          <p>{t.message}</p>
          <Button onClick={() => setOpen(false)}>{t.save}</Button>
        </Dialog>
      </main>
    </ThemeProvider>
  )
}

export default DesignSystem
