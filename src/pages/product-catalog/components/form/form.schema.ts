/* eslint-disable no-useless-escape */
import { FormTypes } from './useCatForm'
import { array, object, SchemaOf, string } from 'yup'

export const schema: SchemaOf<FormTypes> = object().shape({
	code: string().required(),
	name: string().required(),
	link: string().notRequired(),
	image_url: string().notRequired(),
	category: string().required(),
	collection: string().required(),
	routine: string().required(),
	countries: array().notRequired(),
	product_recommendation_id: string().nullable(true).notRequired(),
	product_translations: array().notRequired(),
})
