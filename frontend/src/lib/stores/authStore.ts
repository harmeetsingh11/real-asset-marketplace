import { writable } from 'svelte/store';

export const token = writable<string | null>(null);

export const login = (newToken: string) => {
  token.set(newToken);
  localStorage.setItem('authToken', newToken);
};

export const logout = () => {
  token.set(null);
  localStorage.removeItem('authToken');
};
