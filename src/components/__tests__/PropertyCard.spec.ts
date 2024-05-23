import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import PropertyCard from '@/views/properties/partials/PropertyCard.vue'
import propertiesData from '@/data/properties.json'
import formatCurrency from '@/utils/formatCurrency'

describe('PropertyCard', () => {
  let wrapper: any
  const [property] = propertiesData

  beforeEach(() => {
    wrapper = mount(PropertyCard, {
      global: {
        plugins: [PrimeVue]
      },
      props: {
        property
      }
    })
  })

  it("renders the property's data successfully", async () => {
    const wrapperHtml = wrapper.html()
    expect(wrapperHtml).toContain(property.title)
    expect(wrapperHtml).toContain(property.description)
    expect(wrapperHtml).toContain(formatCurrency(property.price))
  })
})
