import { object, SchemaOf, string } from 'yup'
import { FormForgetTypes } from 'types/login'

export const schema: SchemaOf<FormForgetTypes> = object().shape({
	email: string().email().nullable(true).required(),
})
