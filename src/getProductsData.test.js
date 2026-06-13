import { beforeEach, describe, expect, it, vi } from 'vitest';
import { request } from './api/client';
import { logout, registerUser } from './getProductsData';

vi.mock('./api/client', () => ({ request: vi.fn() }));

describe('logout API', () => {
  beforeEach(() => vi.clearAllMocks());

  it('uses the backend POST endpoint', async () => {
    request.mockResolvedValue(undefined);
    await logout();
    expect(request).toHaveBeenCalledWith({ url: '/users/logout', method: 'POST' });
  });

  it('registers without sending a client-controlled role', async () => {
    request.mockResolvedValue({ role: 'User' });
    await registerUser({ username: 'shopper_1', email: 'user@example.com', password: 'Password123', role: 'Admin' });
    expect(request).toHaveBeenCalledWith({
      url: '/users/register',
      method: 'POST',
      data: { username: 'shopper_1', email: 'user@example.com', password: 'Password123' },
    });
  });
});
