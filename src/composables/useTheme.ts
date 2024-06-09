import { usePrimeVue } from 'primevue/config'
import { useStorage } from '@vueuse/core'
import { t } from '@/plugins/i18n'

export default function useTheme() {
  const primeVue = usePrimeVue()

  const selectedTheme = useStorage<'light' | 'dark'>('theme', 'light')

  const themesOptions = [
    { label: t('settings.light'), value: 'light' },
    { label: t('settings.dark'), value: 'dark' }
  ]

  const themeMap = {
    dark: { current: 'aura-light-blue', new: 'aura-dark-blue' },
    light: { current: 'aura-dark-blue', new: 'aura-light-blue' }
  }

  function setTheme() {
    const { current, new: newTheme } = themeMap[selectedTheme.value]
    primeVue.changeTheme(current, newTheme, 'theme-link', () => {})
  }

  return {
    selectedTheme,
    themesOptions,
    setTheme
  }
}
