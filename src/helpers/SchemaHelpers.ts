import {
  array,
  ArraySchema,
  boolean,
  BooleanSchema,
  number,
  NumberSchema,
  object,
  ObjectSchema,
  ObjectSchemaDefinition,
  Schema,
  string,
  StringSchema,
} from 'yup'

export function objectSchema<T extends Record<string, unknown>>(
  fields: ObjectSchemaDefinition<T>
): ObjectSchema<T> {
  return object(fields).defined().noUnknown().nullable(false)
}

export function arraySchema<T>(schema: Schema<T>): ArraySchema<T> {
  return array(schema).defined().ensure()
}

export function stringSchema(): StringSchema<string> {
  return string().defined().ensure()
}

export function numberSchema(): NumberSchema<null | number> {
  return number().defined().default(null)
}

export function booleanSchema(): BooleanSchema<null | boolean> {
  return boolean().defined().default(false)
}
