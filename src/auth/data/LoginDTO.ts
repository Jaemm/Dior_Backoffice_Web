import { InferType, array, object } from 'yup'

import { numberSchema, objectSchema, stringSchema, arraySchema } from '../../helpers/SchemaHelpers'

export type UserStateDTO = InferType<typeof userStateSchema>
export const userStateSchema = objectSchema({
  id: numberSchema(),
  email: stringSchema(),
  name: stringSchema(),
  location: stringSchema(),
  language: stringSchema(),
  chowis: stringSchema(),
  logged_in: stringSchema(),
  token: stringSchema(),
  consultant_company: objectSchema({
    id: numberSchema(),
    name: stringSchema(),
  }).optional(),
  consultant_position: objectSchema({
    id: numberSchema(),
    name: stringSchema(),
  }).optional(),
  app_id: numberSchema().optional(),
  applications: array().of(
    object().shape({
      id: numberSchema(),
      name: stringSchema(),
    })
  ).optional()
})

export const loginSchema = objectSchema({
  email: stringSchema().required().email(),
  password: stringSchema().required(),
})

export type LoginDTO = InferType<typeof loginSchema>


export const switchAppSchema = objectSchema({
  email: stringSchema().required().email(),
  token: stringSchema().required(),
  app_id: numberSchema().required(),
})

export type SwitchAppDTO = InferType<typeof switchAppSchema>
