<script lang="ts">
  import { onMount } from 'svelte';
  import { asset, fetchAssetDetails } from '$lib/stores/assetStore';
  import { cart, addToCart } from '$lib/stores/cartStore';
  import { page } from '$app/stores';

  let assetId: string = '';
  let assetDetails: {
    assetName: any;
    description: any;
    price: any;
    images: any[];
  } | null = null;

  onMount(async () => {
    assetId = $page.params.assetId;
    assetDetails = await fetchAssetDetails(assetId);
  });

  const handleAddToCart = async () => {
    await addToCart(assetId);
  };
</script>

{#if assetDetails}
  <h2>{assetDetails.assetName}</h2>
  <p>{assetDetails.description}</p>
  <p>${assetDetails.price}</p>
  <img src={assetDetails.images[0]} alt={assetDetails.assetName} />
  <button on:click={handleAddToCart}>Add to Cart</button>
{/if}
