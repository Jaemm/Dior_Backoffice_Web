import { FormTypes } from 'types/login'
import { boolean, object, SchemaOf, string } from 'yup'

export const schema: SchemaOf<FormTypes> = object().shape({
	email: string().email().nullable(true).required(),
	// password: string().min(8).nullable(true).required(),
	remember: boolean(),
})
