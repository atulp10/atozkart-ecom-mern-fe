import { describe, expect, it } from 'vitest';
import { calculateOrderTotal, calculateShipping } from './pricing';

describe('pricing', () => {
  it('adds shipping below the free-shipping threshold', () => {
    expect(calculateOrderTotal([{ price: 10, qty: 1 }])).toEqual({ subtotal: 10, shipping: 5, total: 15 });
  });

  it('does not charge shipping for an empty or qualifying cart', () => {
    expect(calculateShipping(0, false)).toBe(0);
    expect(calculateOrderTotal([{ price: 10, qty: 2 }]).shipping).toBe(0);
  });
});
