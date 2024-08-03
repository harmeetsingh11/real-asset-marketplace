<script lang="ts">
  import { assets, fetchAssets } from '$lib/stores/assetStore';
  import { onMount } from 'svelte';

  onMount(() => {
    fetchAssets();
  });
</script>

<h2>Explore the Marketplace</h2>
<!-- Add filters and category selection here -->
<div>
  {#each $assets as asset}
    <div>
      <h3>{asset.assetName}</h3>
      <p>{asset.description}</p>
      <p>${asset.price}</p>
      <a href={`/dashboard/marketplace/${asset.assetId}`}>View Details</a>
    </div>
  {/each}
</div>
