import { writable } from 'svelte/store';

export interface CartItem {
  cartItemId: string;
  assetId: string;
  assetName: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}

export const cart = writable<Cart>({ items: [], totalPrice: 0 });

export const addToCart = async (assetId: string) => {
  const res = await fetch('http://localhost:3000/api/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: 'some-user-id', assetId }),
  });
  const data = await res.json();
  if (data.status === 'success') {
    fetchCart();
  }
};

export const fetchCart = async () => {
  const res = await fetch('http://localhost:3000/api/cart/view');
  const data = await res.json();
  cart.set(data);
};
