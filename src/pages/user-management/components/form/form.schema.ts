import { FormTypes } from './useManForm'
import { array, boolean, object, SchemaOf, string } from 'yup'

export const schema: SchemaOf<FormTypes> = object().shape({
	name: string().nullable(true).required(),
	surname: string().nullable(true).required(),
	email: string().email().nullable(true).required(),
	is_admin: boolean().notRequired(),
	// consultant_position_id: string().nullable(true).required(),
	countries: array().notRequired(),
	password: string().min(8).nullable(true).required(),
})
