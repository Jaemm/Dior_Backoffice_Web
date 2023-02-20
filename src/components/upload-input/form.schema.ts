import { FormTypes } from './useUpload'
import { boolean, object, SchemaOf, string } from 'yup'

export const schema: SchemaOf<FormTypes> = object().shape({
	file_url: string().nullable(true).required('file is a required field'),
	withCountry: boolean().notRequired(),
	country: string().when('withCountry', {
		is: true,
		then: string().nullable(true).required(),
	}),
})
