<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { token, logout } from '$lib/stores/authStore';

  let authToken = get(token);

  $: {
    $page; // subscribe to page store
    authToken = get(token); // update auth state on page change
  }

  function handleLogout() {
    logout();
  }
</script>

<header class="p-4 bg-gray-800 text-white flex justify-between">
  <div class="text-xl">Real Asset Marketplace</div>
  <nav>
    {#if authToken}
      <ul class="flex space-x-4">
        <li><a href="/dashboard" class="hover:text-gray-400">Dashboard</a></li>
        <li>
          <a href="/dashboard/marketplace" class="hover:text-gray-400"
            >Marketplace</a
          >
        </li>
        <li>
          <a href="/dashboard/profile" class="hover:text-gray-400">Profile</a>
        </li>
        <li>
          <button on:click={handleLogout} class="hover:text-gray-400"
            >Logout</button
          >
        </li>
      </ul>
    {:else}
      <ul class="flex space-x-4">
        <li><a href="/login" class="hover:text-gray-400">Login</a></li>
        <li>
          <a href="/register" class="hover:text-gray-400">Register</a>
        </li>
      </ul>
    {/if}
  </nav>
</header>

<main>
  <slot />
  <!-- This will render the content of the child routes -->
</main>
