import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { setToken } from '@/redux'
import { isValidToken, saveSession } from '@/storage/session'
import { login } from '@/utils/services'
import routes from '@/routes'
import loginSchema from '@/validations/login'
import dictionary from '@/dictionary'
import { readPreference } from '@/shared/preferences'
import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'
import IconProvider from '@/utils/iconProvider'
import { Stack } from '@/shared/ui'
import { Backdrop, Card, Brand, LoginTitle } from './index.styles'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const t = dictionary[readPreference('nova-admin-locale') === 'en' ? 'en' : 'fa']
  const form = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: loginSchema(t.required),
    onSubmit: async values => {
      setError(false)
      try {
        const response = await login(values)
        if (!isValidToken(response.token)) throw new Error('Invalid token')
        saveSession(response.token)
        dispatch(setToken(response.token))
        navigate(routes.home, { replace: true })
      } catch {
        setError(true)
      }
    },
  })

  return (
    <Backdrop>
      <Card>
        <Stack>
          <Brand dir="ltr">NOVA <IconProvider iconName="novaBag" color="#ed6c18" width={40} height={46} /></Brand>
          <LoginTitle>{t.loginTitle}</LoginTitle>
          <form onSubmit={form.handleSubmit} noValidate>
            <Stack>
              <Input label={t.username} name="username" autoComplete="username" value={form.values.username} onChange={form.handleChange} onBlur={form.handleBlur} aria-invalid={Boolean(form.touched.username && form.errors.username)} aria-describedby="username-error" />
              <span id="username-error">{form.touched.username && form.errors.username}</span>
              <Input label={t.password} name="password" type="password" autoComplete="current-password" value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} aria-invalid={Boolean(form.touched.password && form.errors.password)} aria-describedby="password-error" />
              <span id="password-error">{form.touched.password && form.errors.password}</span>
              {error && <p role="alert">{t.loginError}</p>}
              <Button type="submit" disabled={form.isSubmitting}>{form.isSubmitting ? t.loading : t.login}</Button>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Backdrop>
  )
}

export default Login
