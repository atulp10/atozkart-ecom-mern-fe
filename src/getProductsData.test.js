import { beforeEach, describe, expect, it, vi } from 'vitest';
import { request } from './api/client';
import { logout } from './getProductsData';

vi.mock('./api/client', () => ({ request: vi.fn() }));

describe('logout API', () => {
  beforeEach(() => vi.clearAllMocks());

  it('uses the backend POST endpoint', async () => {
    request.mockResolvedValue(undefined);
    await logout();
    expect(request).toHaveBeenCalledWith({ url: '/users/logout', method: 'POST' });
  });
});
