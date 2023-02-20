import { FormTypes } from './useAttributes'
import { array, object, SchemaOf, string } from 'yup'

export const schema: SchemaOf<FormTypes> = object().shape({
	typ: string().nullable(true).required('attribute type is a required field'),
	value: string().nullable(true).required('attribute name is a required field'),
	product_translations: array().notRequired(),
})
