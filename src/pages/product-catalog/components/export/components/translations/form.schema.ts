import { FormTypes } from './useTranslationsForm'
import { object, SchemaOf, string } from 'yup'

export const schema: SchemaOf<FormTypes> = object().shape({
	filter_by_country: string().nullable(true).required(),
})
