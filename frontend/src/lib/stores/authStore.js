// src/lib/stores/authStore.js

import { writable } from 'svelte/store';

// Initialize the store with default or persisted state
const createAuthStore = () => {
  let storedAuthState = {
    isLoggedIn: false,
  };

  // Check if `localStorage` is available
  if (typeof localStorage !== 'undefined') {
    const storedState = localStorage.getItem('authState');
    if (storedState) {
      storedAuthState = JSON.parse(storedState);
    }
  }

  const { subscribe, set, update } = writable(storedAuthState);

  return {
    subscribe,
    login: (/** @type {any} */ userData) => {
      const newState = { isLoggedIn: true, ...userData };
      set(newState);

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('authState', JSON.stringify(newState));
      }
    },
    logout: () => {
      const newState = { isLoggedIn: false };
      set(newState);

      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('authState');
      }
    },
  };
};

export const authStore = createAuthStore();
