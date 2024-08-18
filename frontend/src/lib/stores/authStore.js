// @ts-nocheck
// src/lib/stores/authStore.js

import { writable } from 'svelte/store';
import Cookies from 'js-cookie';

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

  // Initialize cookies if available
  const cookieUserId = Cookies.get('userId');
  const cookieToken = Cookies.get('token');
  if (cookieUserId && cookieToken) {
    storedAuthState = {
      isLoggedIn: true,
      userId: parseInt(cookieUserId, 10),
      token: cookieToken,
    };
  }

  const { subscribe, set, update } = writable(storedAuthState);

  return {
    subscribe,
    login: (userData) => {
      const newState = {
        isLoggedIn: true,
        userId: userData.userId,
        token: userData.token,
      };
      set(newState);

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('authState', JSON.stringify(newState));
      }

      // Set cookies
      Cookies.set('userId', newState.userId, {
        expires: 7,
        secure: true,
        sameSite: 'Lax',
      });
      Cookies.set('token', newState.token, {
        expires: 7,
        secure: true,
        sameSite: 'Lax',
      });
    },
    logout: () => {
      const newState = { isLoggedIn: false, userId: null, token: null };
      set(newState);

      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('authState');
      }

      // Remove cookies
      Cookies.remove('userId');
      Cookies.remove('token');
    },
  };
};

export const authStore = createAuthStore();
