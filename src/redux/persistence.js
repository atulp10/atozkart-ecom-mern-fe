const STORE_KEY = 'atozkart-state';

export function loadState() {
  try {
    const value = localStorage.getItem(STORE_KEY);
    return value ? JSON.parse(value) : undefined;
  } catch {
    return undefined;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ cart: state.cart, fav: state.fav, checkout: state.checkout }));
  } catch {
    // Storage can be unavailable in private browsing or when quota is exceeded.
  }
}
