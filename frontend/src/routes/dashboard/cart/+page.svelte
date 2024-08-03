<script lang="ts">
  import { onMount } from 'svelte';
  import { cart, fetchCart } from '../../lib/stores/cartStore';

  onMount(() => {
    fetchCart();
  });
</script>

<h2>Your Cart</h2>
{#if $cart.items.length > 0}
  <ul>
    {#each $cart.items as item}
      <li>{item.assetName} - ${item.price}</li>
    {/each}
  </ul>
  <p>Total Price: ${$cart.totalPrice}</p>
  <a href="/dashboard/checkout">Proceed to Checkout</a>
{:else}
  <p>Your cart is empty</p>
{/if}
