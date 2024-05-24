import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import i18n from '@/plugins/i18n'
import ToastService from 'primevue/toastservice'
import DetailsForm from '@/views/properties/partials/DetailsForm.vue'
import { property as mockProperty } from '@/data/properties.json'

describe('DetailsForm', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(DetailsForm, {
      global: {
        plugins: [PrimeVue, i18n, ToastService]
      }
    })
  })

  it('renders properly', async () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders a error message when attempting to go to the next step without filling the required fields', async () => {
    // const spy = vi.spyOn(useBaseToast(), 'error')
    await wrapper.find('[data-testid="next-button"]').trigger('click')
    // expect(spy).toHaveBeenCalled()
    expect(wrapper.html()).toContain('This field is required')
  })

  it.skip('emits the next-step event when clicking the next button and all required fields are filled', async () => {
    await wrapper.find('[data-testid="title-input"]').setValue(mockProperty.title)
    await wrapper.find('[data-testid="description-input"]').setValue(mockProperty.description)
    await wrapper.find('[data-testid="price-input"] > input').setValue(mockProperty.price)
    await wrapper.find('[data-testid="size-input"] > input').setValue(mockProperty.size)
    await wrapper.find('[data-testid="imageUrl-input"]').setValue(mockProperty.imageUrl)
    await wrapper.find('[data-testid="next-button"]').trigger('click')
    expect(wrapper.html()).not.toContain('Please fill all required fields')
    expect(wrapper.emitted('next-step')).toBeTruthy()
  })
})
