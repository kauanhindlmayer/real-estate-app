import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import PropertyFormView from '@/views/properties/PropertyFormView.vue'

describe('PropertyFormView', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(PropertyFormView, {
      global: {
        plugins: [PrimeVue],
        mocks: {
          $t: (message: string) => message
        }
      }
    })
  })

  it.skip('renders a error message when attempting to go to the next step without filling the required fields', async () => {
    console.log(wrapper.vm.nextStep)
    await wrapper.find('[data-testid="next-button"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('Please fill all required fields')
  })
})
