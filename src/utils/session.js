const USER_KEY = 'userin';

export function getStoredUser() {
  try {
    const value = sessionStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    sessionStorage.removeItem(USER_KEY);
    return null;
  }
}

export function storeUser(user) {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('authchange'));
}

export function clearStoredUser() {
  sessionStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event('authchange'));
}
