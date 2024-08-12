<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { authStore } from '$lib/stores/authStore';
  import { FilterSolid } from 'flowbite-svelte-icons';
  import { FlatToast, ToastContainer, toasts } from 'svelte-toasts';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let inCart = false;
  let quantity = 1;
  let assets = [];
  let filteredAssets = []; // New state to store filtered assets
  let error = null;
  let selectedCategory = '';
  let selectedPriceRange = '';

  // Retrieve userId from the authStore
  const { userId, token } = get(authStore);

  const showToast = (message, type) => {
    toasts.add({
      description: message,
      duration: 2500, // duration
      placement: 'top-right',
      type: type || 'info', // Fallback type
      theme: 'dark',
    });
  };

  async function fetchAssets() {
    if (!userId) {
      error = 'User not authenticated';
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/asset/user-assets?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch assets');
      }

      assets = await response.json();
      filteredAssets = assets; // Initially show all assets
    } catch (err) {
      error = err.message;
      console.log(`Error: ${err.message}`);
    }
  }

  function applyFilters() {
    filteredAssets = assets.filter((asset) => {
      // Filter by category if selected
      let categoryMatch = selectedCategory
        ? asset.category === selectedCategory
        : true;

      // Filter by price range if selected
      let priceMatch = true;
      if (selectedPriceRange) {
        const [min, max] = selectedPriceRange.split('-').map(Number);
        priceMatch = asset.price >= min && asset.price <= max;
      }

      return categoryMatch && priceMatch;
    });
  }

  function clearFilters() {
    selectedCategory = '';
    selectedPriceRange = '';
    filteredAssets = assets; // Reset to show all assets
  }

  onMount(() => {
    fetchAssets();
  });

  // function toggleCart() {
  //   inCart = !inCart;
  // }

  // function increaseQuantity() {
  //   quantity += 1;
  // }

  // function decreaseQuantity() {
  //   if (quantity > 1) {
  //     quantity -= 1;
  //   } else {
  //     inCart = false;
  //   }
  // }

  async function addToCart(assetId) {
    try {
      const response = await fetch('http://localhost:3000/cart/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          assetId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      const result = await response.json();

      // Show toast message for success
      showToast('Product added to your cart!', 'success');

      inCart = true;
    } catch (err) {
      showToast(`Failed to add product to cart. ${err.message}`, 'error');
    }
  }
</script>

<!-- Navbar -->
<Navbar />
<!-- Main Container -->
<section class="flex flex-col min-h-screen">
  <!-- Main Content -->
  <main
    class="flex-grow py-10 bg-white dark:bg-gray-900 bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900 w-full h-full top-0 left-0 z-0 relative"
  >
    <div class="container mx-auto px-4">
      <!-- Headline -->
      <h1
        class="text-4xl font-bold text-center text-gray-800 mb-8 dark:text-white"
      >
        Browse and Buy: Your Asset Adventure Awaits! 💎
      </h1>

      <!-- Search Bar -->
      <div class="flex justify-center mb-8">
        <input
          type="text"
          class="w-full max-w-lg bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
          placeholder="Search for assets..."
        />
      </div>

      <!-- Filters -->
      <div class="flex justify-end items-center mb-6 space-x-4">
        <button
          class="bg-primary-600 text-white text-sm font-medium rounded-lg p-2.5 flex gap-1 hover:bg-primary-800 dark:hover:bg-primary-700"
          on:click={clearFilters}
        >
          <FilterSolid />Clear Filter
        </button>

        <select
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
          bind:value={selectedCategory}
          on:change={applyFilters}
        >
          <option value="">Select Category</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Machinery">Machinery</option>
          <option value="Furniture">Furniture</option>
          <option value="Antiques">Antiques</option>
          <option value="Stocks">Stocks</option>
          <option value="Bonds">Bonds</option>
          <option value="Watches">Watches</option>
          <option value="Vehicles">Vehicles</option>
        </select>

        <select
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
          bind:value={selectedPriceRange}
          on:change={applyFilters}
        >
          <option value="">Price Range</option>
          <option value="0-1000">$0 - $1,000</option>
          <option value="1000-10000">$1,000 - $10,000</option>
          <option value="10000-50000">$10,000 - $50,000</option>
          <option value="50000-70000">$50,000 - $70,000</option>
          <option value="70000-110000">$70,000 - $110,000</option>
        </select>
      </div>

      <!-- Assets Section -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {#if error}
          <p class="text-center text-red-500">{error}</p>
        {:else if filteredAssets.length === 0}
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mx-auto mt-12 w-full max-w-3xl text-center col-span-full border border-red-300 dark:border-red-500"
          >
            <span class="font-medium mr-1">No assets found.</span>
            To add a new asset, please visit the 'Asset Listing' section in the navigation
            menu.
          </div>
        {:else}
          {#each filteredAssets as asset}
            <div
              class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:translate-y-[-10px] hover:shadow-xl"
            >
              <!-- Image Section -->
              <div class="flex items-center justify-center p-4">
                <img
                  class="w-64 h-64 rounded-lg object-fill transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"
                  src={asset.images[0]}
                  alt={asset.assetName}
                />
              </div>

              <!-- Asset Details Section -->
              <div class="px-5 pb-5">
                <div class="mb-3">
                  <span
                    class="bg-primary-100 text-primary-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-md dark:bg-primary-900 dark:text-primary-300"
                  >
                    {asset.category}
                  </span>
                </div>
                <h5
                  class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
                >
                  {asset.assetName}
                </h5>
                <div class="flex items-center mt-2.5 mb-5">
                  <p
                    class="font-normal text-sm text-gray-700 dark:text-gray-400"
                  >
                    {asset.description}
                  </p>
                </div>
                <div class="flex items-center justify-between">
                  <span
                    class="text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    ${asset.price}
                  </span>
                  <!-- {#if !inCart} -->
                  <a
                    href="#"
                    on:click|preventDefault={() => addToCart(asset.assetId)}
                    class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Add to Cart
                  </a>
                  <!-- {:else}
                      <div class="flex items-center space-x-3">
                        <button
                          on:click={decreaseQuantity}
                          class="bg-gray-200 text-gray-700 rounded-md p-2 hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span class="text-sm font-medium dark:text-white">
                          {quantity}
                        </span>
                        <button
                          on:click={increaseQuantity}
                          class="bg-gray-200 text-gray-700 rounded-md p-2 hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    {/if} -->
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </main>
  <ToastContainer let:data>
    <FlatToast {data} />
    <!-- Provider template for your toasts -->
  </ToastContainer>
</section>
<Footer />
