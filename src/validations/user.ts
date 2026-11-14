import * as Yup from 'yup'

const userSchema = (messages: { required: string; invalidEmail: string; invalidPassword: string; invalidPhone: string }) => Yup.object({
  firstname: Yup.string().trim().required(messages.required),
  lastname: Yup.string().trim().required(messages.required),
  username: Yup.string().trim().required(messages.required),
  email: Yup.string().trim().email(messages.invalidEmail).required(messages.required),
  password: Yup.string().min(8, messages.invalidPassword).required(messages.required),
  phone: Yup.string().matches(/^\+?[0-9 ()-]{7,20}$/, messages.invalidPhone).required(messages.required),
})

export default userSchema
