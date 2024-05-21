import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import AppInputText from '@/components/wrappers/AppInputText.vue'

describe('AppInputText', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(AppInputText, {
      global: {
        plugins: [PrimeVue]
      }
    })
  })

  it('renders properly', async () => {
    wrapper.setProps({ label: 'Name' })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Name')
  })

  it('renders the error message when input is invalid', async () => {
    wrapper.setProps({ modelValue: '', required: true })
    await wrapper.vm.$nextTick()
    wrapper.vm.isValid()
    await wrapper.vm.$nextTick()
    const errorMessageElement = wrapper.find('.p-error')
    expect(errorMessageElement.exists()).toBe(true)
    expect(errorMessageElement.text()).toBe('This field is required')
  })

  it('does not render the error message when input is valid', async () => {
    wrapper.setProps({ modelValue: 'John Doe', required: true })
    await wrapper.vm.$nextTick()
    wrapper.vm.isValid()
    await wrapper.vm.$nextTick()
    const errorMessageElement = wrapper.find('.p-error')
    expect(errorMessageElement.exists()).toBe(false)
  })
})
