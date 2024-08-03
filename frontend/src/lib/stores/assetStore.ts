import { writable } from 'svelte/store';

export interface Asset {
  assetId: string;
  assetName: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

export const assets = writable<Asset[]>([]);

export const fetchAssets = async () => {
  const res = await fetch('http://localhost:3000/api/asset/browse');
  const data = await res.json();
  assets.set(data.assets);
};

export const fetchAssetDetails = async (assetId: string) => {
  const res = await fetch(`http://localhost:3000/api/asset/details?assetId=${assetId}`);
  const data = await res.json();
  return data;
};
