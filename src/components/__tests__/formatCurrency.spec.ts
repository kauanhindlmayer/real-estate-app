import { describe, it, expect } from 'vitest'

import formatCurrency from '@/utils/formatCurrency'

describe('formatCurrency', () => {
  it('formats a number to currency', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('formats a negative number to currency', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56')
  })

  it('formats a number with no decimal to currency', () => {
    expect(formatCurrency(1234)).toBe('$1,234.00')
  })
})
