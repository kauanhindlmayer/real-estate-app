import type { App } from 'vue'

import AppButton from '@/components/wrappers/AppButton.vue'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppInputNumber from '@/components/wrappers/AppInputNumber.vue'
import AppCheckbox from '@/components/wrappers/AppCheckbox.vue'
import AppDropdown from '@/components/wrappers/AppDropdown.vue'

export function registerComponents(app: App<Element>) {
  app.component('AppButton', AppButton)
  app.component('AppInputText', AppInputText)
  app.component('AppInputNumber', AppInputNumber)
  app.component('AppCheckbox', AppCheckbox)
  app.component('AppDropdown', AppDropdown)
}
