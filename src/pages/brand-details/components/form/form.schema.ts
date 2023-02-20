import { FormTypes } from './useBrand'
import { object, SchemaOf, string } from 'yup'

export const schema: SchemaOf<FormTypes> = object().shape({
	country: string().nullable(true).required(),
	code: string().nullable(true).required(),
	name: string().nullable(true).required(),
	email: string().email().nullable(true).required(),
	password: string().min(8).nullable(true).required(),
})
