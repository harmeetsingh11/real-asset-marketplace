<script>
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import { authStore } from '$lib/stores/authStore';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { redirect } from '@sveltejs/kit';

  let isLoggedIn = false;

  onMount(() => {
    const unsubscribe = authStore.subscribe((auth) => {
      isLoggedIn = auth.isLoggedIn;
      if (!isLoggedIn) {
        goto('/login'); // Redirect to login if not logged in
      }
    });

    unsubscribe();
  });
</script>

<Navbar />
<slot />
<Footer />
