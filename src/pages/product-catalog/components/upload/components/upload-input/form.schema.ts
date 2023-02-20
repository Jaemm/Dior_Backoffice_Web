import { FormTypes } from './useUpload'
import { array, object, SchemaOf } from 'yup'

export const schema: SchemaOf<FormTypes> = object().shape({
	file_url: array().min(1).required('file is a required field'),
})
