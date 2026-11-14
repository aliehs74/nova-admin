import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { ArrowRight } from 'lucide-react'
import dictionary from '@/dictionary'
import routes from '@/routes'
import userSchema from '@/validations/user'
import { createUser } from '@/utils/services'
import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'
import { Row, Stack, Surface } from '@/shared/ui'

const CreateUser = ({ locale }: { locale: 'fa' | 'en' }) => {
  const t = dictionary[locale]
  const navigate = useNavigate()
  const [failed, setFailed] = useState(false)
  const form = useFormik({
    initialValues: { firstname: '', lastname: '', username: '', email: '', password: '', phone: '' },
    validationSchema: userSchema(t),
    onSubmit: async values => {
      setFailed(false)
      try {
        await createUser({ name: { firstname: values.firstname.trim(), lastname: values.lastname.trim() }, username: values.username.trim(), email: values.email.trim(), password: values.password, phone: values.phone })
        form.resetForm()
        navigate(routes.users, { replace: true, state: { userSaved: true } })
      } catch { setFailed(true) }
    },
  })
  const fields = ['firstname', 'lastname', 'username', 'email', 'password', 'phone'] as const

  return (
    <Surface>
      <button type="button" className="back-products" aria-label={t.backUsers} onClick={() => navigate(routes.users)}><ArrowRight aria-hidden="true" /></button>
      <h1>{t.createUser}</h1>
      <form onSubmit={form.handleSubmit} noValidate>
        <Stack>
          <div className="user-form-grid">
            {fields.map(field => (
              <div key={field}>
                <Input label={`${t[field]} *`} name={field} type={field === 'password' ? 'password' : field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} autoComplete={field === 'password' ? 'new-password' : field === 'firstname' ? 'given-name' : field === 'lastname' ? 'family-name' : field === 'phone' ? 'tel' : field} value={form.values[field]} onChange={form.handleChange} onBlur={form.handleBlur} aria-invalid={Boolean(form.touched[field] && form.errors[field])} aria-describedby={`${field}-error`} disabled={form.isSubmitting} />
                <span id={`${field}-error`}>{form.touched[field] && form.errors[field]}</span>
              </div>
            ))}
          </div>
          {failed && <p role="alert">{t.error}</p>}
          <Row className="form-actions"><Button type="submit" disabled={form.isSubmitting}>{form.isSubmitting ? t.loading : t.submitUser}</Button><Button customVariant="secondary" disabled={form.isSubmitting} onClick={() => navigate(routes.users)}>{t.cancel}</Button></Row>
        </Stack>
      </form>
    </Surface>
  )
}

export default CreateUser
