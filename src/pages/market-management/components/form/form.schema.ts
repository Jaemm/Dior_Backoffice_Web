import { FormTypes } from './useMarketForm'
import { object, SchemaOf, string } from 'yup'

export const schema: SchemaOf<FormTypes> = object().shape({
	code: string().nullable(true).required(),
	name: string().nullable(true).required(),
	default_recommendation: string().nullable(true).required(),
})
