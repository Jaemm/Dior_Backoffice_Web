import { OktaFormTypes } from 'types/login'
import { boolean, object, SchemaOf, string } from 'yup'

export const schema: SchemaOf<OktaFormTypes> = object().shape({
	email: string().email().nullable(true).required(),
	remember: boolean(),
})
