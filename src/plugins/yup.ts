import { setLocale } from 'yup'
import { t } from '@/plugins/i18n'

interface ValidationContext {
  path: string
  [key: string]: any
}

interface ValidationTypes {
  [key: string]: string[]
}

function createValidationMessage(key: string, { path, ...params }: ValidationContext) {
  return t(`validation.${key}`, { field: t(`fields.${path}`), ...params })
}

const validationTypes: ValidationTypes = {
  mixed: ['required', 'oneOf', 'notOneOf'],
  string: ['length', 'min', 'max', 'matches', 'email', 'url', 'trim', 'lowercase', 'uppercase'],
  number: ['min', 'max', 'positive', 'negative', 'integer'],
  date: ['min', 'max'],
  boolean: ['isValue'],
  object: ['noUnknown'],
  array: ['min', 'max']
}

function generateValidationConfig(types: ValidationTypes) {
  return Object.fromEntries(
    Object.entries(types).map(([type, keys]) => [
      type,
      Object.fromEntries(
        keys.map((key) => [
          key,
          (context: ValidationContext) => createValidationMessage(key, context)
        ])
      )
    ])
  )
}

function installYup() {
  setLocale(generateValidationConfig(validationTypes))
}

export default installYup
