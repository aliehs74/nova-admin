import * as Yup from 'yup'

const loginSchema = (required: string) => Yup.object({
  username: Yup.string().trim().required(required),
  password: Yup.string().required(required),
})

export default loginSchema
