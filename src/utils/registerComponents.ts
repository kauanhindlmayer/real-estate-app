import type { App } from 'vue'

import AppButton from '@/components/wrappers/AppButton.vue'
import AppInputText from '@/components/wrappers/AppInputText.vue'
import AppInputNumber from '@/components/wrappers/AppInputNumber.vue'
import AppInputIcon from '@/components/wrappers/AppInputIcon.vue'
import AppCheckboxGroup from '@/components/wrappers/AppCheckboxGroup.vue'
import AppDropdown from '@/components/wrappers/AppDropdown.vue'
import AppSkeleton from '@/components/wrappers/AppSkeleton.vue'

export function registerComponents(app: App<Element>) {
  app.component('AppButton', AppButton)
  app.component('AppInputText', AppInputText)
  app.component('AppInputNumber', AppInputNumber)
  app.component('AppInputIcon', AppInputIcon)
  app.component('AppCheckboxGroup', AppCheckboxGroup)
  app.component('AppDropdown', AppDropdown)
  app.component('AppSkeleton', AppSkeleton)
}
