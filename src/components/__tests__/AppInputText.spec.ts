import { describe, it, expect, beforeEach } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import AppInputText from '@/components/wrappers/AppInputText.vue'

describe('AppInputText', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(AppInputText, {
      global: {
        plugins: [PrimeVue]
      }
    })
  })

  it('renders properly', async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the label when provided', async () => {
    wrapper.setProps({ label: 'Name' })
    await wrapper.vm.$nextTick()
    const labelElement = wrapper.find('label')
    expect(labelElement.exists()).toBe(true)
    expect(labelElement.text()).toBe('Name')
  })

  it('does not render the label when not provided', async () => {
    const labelElement = wrapper.find('label')
    expect(labelElement.exists()).toBe(false)
  })

  it('renders the error message when input is invalid', async () => {
    wrapper.setProps({ modelValue: '', label: 'Name', required: true })
    await wrapper.vm.$nextTick()
    wrapper.vm.isValid()
    await wrapper.vm.$nextTick()
    const errorMessageElement = wrapper.find('small.p-error')
    expect(errorMessageElement.exists()).toBe(true)
    expect(errorMessageElement.text()).toBe('This field is required')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('does not render the error message when input is valid', async () => {
    wrapper.setProps({ modelValue: 'John Doe', required: true })
    await wrapper.vm.$nextTick()
    wrapper.vm.isValid()
    await wrapper.vm.$nextTick()
    const errorMessageElement = wrapper.find('small.p-error')
    expect(errorMessageElement.exists()).toBe(false)
  })
})
