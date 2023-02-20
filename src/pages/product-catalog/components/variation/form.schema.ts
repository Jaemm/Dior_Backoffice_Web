/* eslint-disable no-useless-escape */
import { FormTypes } from './useVariation'
import { number, object, SchemaOf, string } from 'yup'

export const schema: SchemaOf<FormTypes> = object().shape({
	code: string().required(),
	name: string().required(),
	link: string().notRequired(),
	image_url: string().notRequired(),
	category: string().required(),
	collection: string().required(),
	routine: string().required(),
	id: number().notRequired(),
})
