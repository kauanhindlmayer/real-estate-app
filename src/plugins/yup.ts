import { setLocale } from 'yup'
import i18n from '@/plugins/i18n'

const { t } = i18n.global

const setYupLocale = () => {
  setLocale({
    mixed: {
      required: ({ path }) => t('validation.required', { field: t(`fields.${path}`) }),
      oneOf: ({ path }) => t('validation.oneOf', { field: t(`fields.${path}`) }),
      notOneOf: ({ path, values }) =>
        t('validation.notOneOf', { field: t(`fields.${path}`), values })
    },
    string: {
      length: ({ path, length }) => t('validation.length', { field: t(`fields.${path}`), length }),
      min: ({ path, min }) => t('validation.min', { field: t(`fields.${path}`), min }),
      max: ({ path, max }) => t('validation.max', { field: t(`fields.${path}`), max }),
      matches: ({ path }) => t('validation.matches', { field: t(`fields.${path}`) }),
      email: ({ path }) => t('validation.email', { field: t(`fields.${path}`) }),
      url: ({ path }) => t('validation.url', { field: t(`fields.${path}`) }),
      trim: ({ path }) => t('validation.trim', { field: t(`fields.${path}`) }),
      lowercase: ({ path }) => t('validation.lowercase', { field: t(`fields.${path}`) }),
      uppercase: ({ path }) => t('validation.uppercase', { field: t(`fields.${path}`) })
    },
    number: {
      min: ({ path, min }) => t('validation.minValue', { field: t(`fields.${path}`), min }),
      max: ({ path, max }) => t('validation.maxValue', { field: t(`fields.${path}`), max }),
      positive: ({ path }) => t('validation.positive', { field: t(`fields.${path}`) }),
      negative: ({ path }) => t('validation.negative', { field: t(`fields.${path}`) }),
      integer: ({ path }) => t('validation.integer', { field: t(`fields.${path}`) })
    },
    date: {
      min: ({ path, min }) => t('validation.minDate', { field: t(`fields.${path}`), min }),
      max: ({ path, max }) => t('validation.maxDate', { field: t(`fields.${path}`), max })
    },
    boolean: {
      isValue: ({ path, value }) => t('validation.isValue', { field: t(`fields.${path}`), value })
    },
    object: {
      noUnknown: ({ path, unknown }) =>
        t('validation.noUnknown', { field: t(`fields.${path}`), unknown })
    },
    array: {
      min: ({ path, min }) => t('validation.arrayMin', { field: t(`fields.${path}`), min }),
      max: ({ path, max }) => t('validation.arrayMax', { field: t(`fields.${path}`), max })
    }
  })
}

export default setYupLocale
