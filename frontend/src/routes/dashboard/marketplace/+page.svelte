<script>
  import { FilterSolid } from 'flowbite-svelte-icons';
  let inCart = false;
  let quantity = 1;

  function toggleCart() {
    inCart = true;
  }

  function increaseQuantity() {
    quantity += 1;
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      quantity -= 1;
    } else {
      inCart = false;
    }
  }
</script>

<section
  class="min-h-screen py-10 bg-white dark:bg-gray-900 bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900 w-full h-full top-0 left-0 z-0 flex items-center justify-center relative"
  style="background-image: linear-gradient(to bottom, var(--tw-gradient-stops) 70%);"
>
  <div class="container mx-auto px-4">
    <!-- Headline -->
    <h1
      class="text-4xl font-bold text-center text-gray-800 mb-8 dark:text-white"
    >
      Browse and Buy: Your Asset Adventure Awaits! 🛒
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
        class="bg-primary-600 text-white text-sm font-medium rounded-lg p-2.5 flex gap-1"
        ><FilterSolid />Filter</button
      >
      <select
        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5"
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
      >
        <option value="">Price Range</option>
        <option value="0-1000">$0 - $1,000</option>
        <option value="1000-10000">$1,000 - $10,000</option>
        <option value="10000-50000">$10,000 - $50,000</option>
        <option value="50000-70000">$50,000 - $70,000</option>
        <option value="70000-70000">$70,000 - $110,000</option>
      </select>
    </div>

    <!-- Assets Section -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <!-- Placeholder for Assets -->

      <div
        class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:translate-y-[-10px] hover:shadow-xl"
      >
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <div class="flex items-center justify-center p-4">
          <img
            class="w-64 h-64 rounded-lg object-fill"
            src="https://vintagecarforwedding.com/wp-content/uploads/2021/06/Honeyview__LAK8572-2.jpg"
            alt="product image"
          />
        </div>

        <div class="px-5 pb-5">
          <div class="mb-3">
            <span
              class="bg-primary-100 text-primary-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-md dark:bg-primary-900 dark:text-primary-300"
              >Vehicles</span
            >
          </div>
          <h5
            class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            Vintage Car
          </h5>
          <div class="flex items-center mt-2.5 mb-5">
            <p class="font-normal text-sm text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white"
              >$599</span
            >

            {#if !inCart}
              <a
                href="#"
                on:click|preventDefault={toggleCart}
                class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Add to Cart
              </a>
            {:else}
              <div class="flex items-center space-x-3">
                <button
                  on:click={decreaseQuantity}
                  class="bg-gray-200 text-gray-700 rounded-md p-2 hover:bg-gray-300"
                >
                  -
                </button>
                <span class="text-sm font-medium dark:text-white"
                  >{quantity}</span
                >
                <button
                  on:click={increaseQuantity}
                  class="bg-gray-200 text-gray-700 rounded-md p-2 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>

      <!-- Repeat the asset card as needed -->
    </div>
  </div>
</section>
