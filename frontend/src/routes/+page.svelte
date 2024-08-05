<script>
  import Footer from '$lib/components/Footer.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="flex flex-col min-h-screen">
  <Navbar />
  <main class="flex-grow flex">
    <Hero />
  </main>
  <Footer />
</div>
