import { FormTypes } from './useProForm'
import { array, number, object, SchemaOf, string } from 'yup'

export const schema: SchemaOf<FormTypes> = object().shape({
	name: string().nullable(true).required(),
	skin: string()
		.nullable()
		.when('tabValue', {
			is: 0,
			then: string().nullable(true).required('recommendation is a required field'),
		}),
	make: string()
		.nullable()
		.when('tabValue', {
			is: 1,
			then: string().nullable().required('recommendation is a required field'),
		}),
	preserum: number().notRequired(),
	lotion: number().notRequired(),
	serum: number().notRequired(),
	cream: number().notRequired(),
	eye: number().notRequired(),
	uv: number().notRequired(),
	make1: number().notRequired(),
	make2: number().notRequired(),
	make3: number().notRequired(),
	tabValue: number().required(),
	products_selected: array().notRequired(),
})
