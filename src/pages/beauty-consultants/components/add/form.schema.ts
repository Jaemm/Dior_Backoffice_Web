import { FormTypes } from './useAdd'
import { number, object, SchemaOf, string } from 'yup'

export const schema: SchemaOf<FormTypes> = object().shape({
	country: string().nullable(true).required(),
	code: string().nullable(true).required(),
	name: string().nullable(true).required(),
	consultant_branch_id: number().nullable(true).required(),
})
