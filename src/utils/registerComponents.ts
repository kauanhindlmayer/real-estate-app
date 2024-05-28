import type { App } from 'vue'

import BaseButton from '@/components/wrappers/form/BaseButton.vue'
import BaseInputText from '@/components/wrappers/form/BaseInputText.vue'
import BaseInputNumber from '@/components/wrappers/form/BaseInputNumber.vue'
import BaseInputIcon from '@/components/wrappers/form/BaseInputIcon.vue'
import BaseCheckboxGroup from '@/components/wrappers/form/BaseCheckboxGroup.vue'
import BaseDropdown from '@/components/wrappers/form/BaseDropdown.vue'
import BaseSkeleton from '@/components/wrappers/misc/BaseSkeleton.vue'

export function registerComponents(app: App<Element>) {
  app.component('BaseButton', BaseButton)
  app.component('BaseInputText', BaseInputText)
  app.component('BaseInputNumber', BaseInputNumber)
  app.component('BaseInputIcon', BaseInputIcon)
  app.component('BaseCheckboxGroup', BaseCheckboxGroup)
  app.component('BaseDropdown', BaseDropdown)
  app.component('BaseSkeleton', BaseSkeleton)
}
