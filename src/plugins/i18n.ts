import { createI18n } from 'vue-i18n'

import ptBR from '@/locales/pt-BR.json'
import enUS from '@/locales/en-US.json'

type MessageSchema = typeof enUS

const i18n = createI18n<[MessageSchema], 'en-US' | 'pt-BR'>({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: 'en',
  messages: {
    'pt-BR': ptBR,
    'en-US': enUS
  }
})

export function t(key: string): string {
  return i18n.global.t(key)
}

export default i18n
