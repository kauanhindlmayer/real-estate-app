import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import i18n from '@/plugins/i18n'
import PropertyCreate from '@/views/properties/PropertyCreate.vue'

describe('PropertyCreate', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(PropertyCreate, {
      global: {
        plugins: [PrimeVue, i18n]
      }
    })
  })

  it('renders properly', async () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the page title with the correct text', async () => {
    const title = await wrapper.find('[data-testid="title"]')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Create Property')
  })

  it('renders the page description with the correct text', async () => {
    const description = await wrapper.find('[data-testid="description"]')
    expect(description.exists()).toBe(true)
    expect(description.text()).toBe('Fill in the details to add a new property to your listings')
  })
})
