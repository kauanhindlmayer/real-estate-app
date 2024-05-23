import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import i18n from '@/plugins/i18n'
import DetailsForm from '@/views/properties/partials/DetailsForm.vue'
import propertiesData from '@/data/properties.json'

describe('DetailsForm', () => {
  let wrapper: any
  const property = propertiesData[0]

  beforeEach(() => {
    wrapper = mount(DetailsForm, {
      global: {
        plugins: [PrimeVue, i18n]
      },
      props: {
        modelValue: property,
        'onUpdate:modelValue': async (e) => await wrapper.setProps({ modelValue: e })
      }
    })
  })

  it('renders properly', async () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders a error message when attempting to go to the next step without filling the required fields', async () => {
    console.log(wrapper.vm.nextStep)
    await wrapper.find('[data-testid="next-button"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('Please fill all required fields')
  })

  it('emits the next-step event when clicking the next button and all required fields are filled', async () => {
    await wrapper.find('[data-testid="title-input"]').setValue(property.title)
    await wrapper.find('[data-testid="description-input"]').setValue(property.description)
    await wrapper.find('[data-testid="price-input"]').setValue(property.price)
    await wrapper.find('[data-testid="size-input"]').setValue(property.size)
    await wrapper.find('[data-testid="imageUrl-input"]').setValue(property.imageUrl)
    await wrapper.find('[data-testid="next-button"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).not.toContain('Please fill all required fields')
    expect(wrapper.emitted('next-step')).toBeTruthy()
  })
})
