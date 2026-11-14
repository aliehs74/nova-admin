import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { ArrowRight } from 'lucide-react'
import * as Yup from 'yup'
import { getCategories, createProduct } from '@/utils/services'
import dictionary from '@/dictionary'
import routes from '@/routes'
import Button from '@/components/atoms/button'
import Input from '@/components/atoms/input'
import { Stack, Row, Surface, Select } from '@/shared/ui'
import { FormGrid } from '@/pages/homepage/index.styles'
type TProps = { locale: 'fa' | 'en' }
const CreateProduct = ({ locale }: TProps) => {
const t = dictionary[locale]
const navigate = useNavigate()
  const [categories, setCategories] = useState<string[]>([])
  const [categoryState, setCategoryState] = useState<'loading' | 'error' | 'ready'>('loading')
  const [submitFailed, setSubmitFailed] = useState(false)
useEffect(() => { const controller = new AbortController(); getCategories(controller.signal).then(data => { setCategories(data); setCategoryState(data.length ? 'ready' : 'error') }).catch(() => { if (!controller.signal.aborted) setCategoryState('error') }); return () => controller.abort() }, [])
  const form = useFormik({
    initialValues: { title: '', description: '', price: '', category: '', image: '' },
    validationSchema: Yup.object({
      title: Yup.string().trim().required(t.required), description: Yup.string().trim().required(t.required),
      price: Yup.number().typeError(t.invalidPrice).positive(t.invalidPrice).required(t.required),
      category: Yup.string().oneOf(categories, t.required).required(t.required), image: Yup.string().url(t.invalidUrl).matches(/^https?:\/\//, t.invalidUrl).required(t.required),
    }),
    onSubmit: async values => {
      setSubmitFailed(false)
      try {
        await createProduct({ ...values, price: Number(values.price) })
        navigate(routes.products, { state: { productSaved: true } })
      } catch { setSubmitFailed(true) }
    },
  })
const fields = ['title', 'description', 'price', 'image'] as const
return (
            <Surface>
              <button type="button" className="back-products" aria-label={t.backProducts} onClick={() => navigate(routes.products)}><ArrowRight aria-hidden="true" /></button>
              <form onSubmit={form.handleSubmit} noValidate>
                <Stack>
                  <FormGrid>
                    <div><img key={form.values.image} src={/^https?:\/\//.test(form.values.image) ? form.values.image : '/images/product-placeholder.svg'} alt={form.values.title || t.preview} onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/images/product-placeholder.svg' }} /></div>
                    <Stack>
                      {fields.map(field => (
                        <div key={field}>
                          <Input label={`${t[field]} *`} name={field} type={field === 'price' ? 'number' : field === 'image' ? 'url' : 'text'} step={field === 'price' ? '0.01' : undefined} value={form.values[field]} onChange={form.handleChange} onBlur={form.handleBlur} aria-invalid={Boolean(form.touched[field] && form.errors[field])} aria-describedby={`${field}-error`} />
                          <span id={`${field}-error`}>{form.touched[field] && form.errors[field]}</span>
                        </div>
                      ))}
                      <Select label={`${t.category} *`} name="category" value={form.values.category} onChange={form.handleChange} onBlur={form.handleBlur} disabled={categoryState !== 'ready'} aria-describedby="category-error">
                        <option value="">{t.selectCategory}</option>
                        {categories.map(category => <option key={category} value={category}>{category}</option>)}
                      </Select>
                      <span id="category-error">{form.touched.category && form.errors.category}</span>
                      {categoryState === 'loading' && <p role="status">{t.loading}</p>}
                      {categoryState === 'error' && <p role="alert">{t.error}</p>}
                    </Stack>
                  </FormGrid>
                  {submitFailed && <p role="alert">{t.error}</p>}
                  <Row className="form-actions"><Button type="submit" disabled={form.isSubmitting || categoryState !== 'ready'}>{form.isSubmitting ? t.loading : t.submitProduct}</Button><Button customVariant="secondary" onClick={() => navigate(routes.products)}>{t.cancel}</Button></Row>
                </Stack>
              </form>
            </Surface>
)
}
export default CreateProduct
