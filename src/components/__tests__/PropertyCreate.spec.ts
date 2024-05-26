import { describe, it, expect, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import i18n from '@/plugins/i18n'
import PropertyCreate from '@/views/properties/PropertyCreate.vue'

describe('PropertyCreate', () => {
  let wrapper: VueWrapper

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
})
