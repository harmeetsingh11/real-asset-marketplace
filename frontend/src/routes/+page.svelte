<script lang="ts">
  import { token } from '$lib/stores/authStore';
  import { get } from 'svelte/store';

  let authToken = get(token);
  $: authToken = get(token);
</script>

<section class="p-8">
  <h1 class="text-4xl font-bold">Welcome to the Real Asset Marketplace</h1>
  <p class="mt-4">Explore and manage your assets with ease.</p>

  {#if !authToken}
    <div class="mt-4">
      <a href="/login" class="mr-4 bg-blue-500 text-white p-2 rounded">Login</a>
      <a href="/register" class="bg-green-500 text-white p-2 rounded"
        >Register</a
      >
    </div>
  {/if}
</section>
