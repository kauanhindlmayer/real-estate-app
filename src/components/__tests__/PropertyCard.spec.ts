import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import { property as mockProperty } from '@/data/properties.json'
import formatCurrency from '@/utils/formatCurrency'

describe('PropertyCard', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(PropertyCard, {
      global: {
        plugins: [PrimeVue]
      },
      props: {
        property: mockProperty
      }
    })
  })

  it("renders the property's data successfully", async () => {
    const wrapperHtml = wrapper.html()
    expect(wrapperHtml).toContain(mockProperty.title)
    expect(wrapperHtml).toContain(mockProperty.description)
    expect(wrapperHtml).toContain(formatCurrency(mockProperty.price))
  })
})
