import { describe, expect, it } from 'vitest';
import { validateProduct, validateRegistration, validateShippingAddress } from './validation';

describe('validation', () => {
  it('rejects malformed registration data', () => {
    const result = validateRegistration({ username: 'a', email: 'bad', password: 'short', confpass: 'other' });
    expect(result.valid).toBe(false);
    expect(Object.keys(result.errors)).toEqual(expect.arrayContaining(['username', 'email', 'password', 'confpass']));
  });

  it('accepts a complete shipping address', () => {
    const result = validateShippingAddress({ fullname: 'Atul P', phone: '9876543210', email: 'a@example.com', addressline1: 'One Street', addressline2: '', area: 'Center', city: 'Pune', pincode: '411001', state: 'Maharashtra' });
    expect(result.valid).toBe(true);
  });

  it('requires positive price and whole non-negative stock', () => {
    const result = validateProduct({ title: 'Item', price: 0, stock: 1.5, category: 'Home', image: 'https://example.com/a.jpg', brand: '', description: '' });
    expect(result.errors).toMatchObject({ price: expect.any(String), stock: expect.any(String) });
  });
});
