import { setLocale } from 'yup'
import i18n from '@/plugins/i18n'

const { t } = i18n.global

const setYupLocale = () => {
  setLocale({
    mixed: {
      required: ({ path }) => t('validation.required', { path: t(`fields.${path}`) }),
      oneOf: ({ path }) => t('validation.oneOf', { path: t(`fields.${path}`) }),
      notOneOf: ({ path, values }) =>
        t('validation.notOneOf', { path: t(`fields.${path}`), values })
    },
    string: {
      length: ({ path, length }) => t('validation.length', { path: t(`fields.${path}`), length }),
      min: ({ path, min }) => t('validation.min', { path: t(`fields.${path}`), min }),
      max: ({ path, max }) => t('validation.max', { path: t(`fields.${path}`), max }),
      matches: ({ path }) => t('validation.matches', { path: t(`fields.${path}`) }),
      email: ({ path }) => t('validation.email', { path: t(`fields.${path}`) }),
      url: ({ path }) => t('validation.url', { path: t(`fields.${path}`) }),
      trim: ({ path }) => t('validation.trim', { path: t(`fields.${path}`) }),
      lowercase: ({ path }) => t('validation.lowercase', { path: t(`fields.${path}`) }),
      uppercase: ({ path }) => t('validation.uppercase', { path: t(`fields.${path}`) })
    },
    number: {
      min: ({ path, min }) => t('validation.minValue', { path: t(`fields.${path}`), min }),
      max: ({ path, max }) => t('validation.maxValue', { path: t(`fields.${path}`), max }),
      positive: ({ path }) => t('validation.positive', { path: t(`fields.${path}`) }),
      negative: ({ path }) => t('validation.negative', { path: t(`fields.${path}`) }),
      integer: ({ path }) => t('validation.integer', { path: t(`fields.${path}`) })
    },
    date: {
      min: ({ path, min }) => t('validation.minDate', { path: t(`fields.${path}`), min }),
      max: ({ path, max }) => t('validation.maxDate', { path: t(`fields.${path}`), max })
    },
    boolean: {
      isValue: ({ path, value }) => t('validation.isValue', { path: t(`fields.${path}`), value })
    },
    object: {
      noUnknown: ({ path, unknown }) =>
        t('validation.noUnknown', { path: t(`fields.${path}`), unknown })
    },
    array: {
      min: ({ path, min }) => t('validation.arrayMin', { path: t(`fields.${path}`), min }),
      max: ({ path, max }) => t('validation.arrayMax', { path: t(`fields.${path}`), max })
    }
  })
}

export default setYupLocale
