import { describe, expect, it } from 'vitest';
import { createIdempotencyKey } from './idempotency';

describe('idempotency keys', () => {
  it('creates distinct keys with the requested prefix', () => {
    const first = createIdempotencyKey('cod');
    const second = createIdempotencyKey('cod');
    expect(first).toMatch(/^cod-.{8,}$/);
    expect(second).not.toBe(first);
  });
});
