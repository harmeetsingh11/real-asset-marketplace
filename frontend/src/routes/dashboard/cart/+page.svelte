<script>
  // @ts-nocheck

  import { CartOutline } from 'flowbite-svelte-icons';
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/authStore';
  import { get } from 'svelte/store';

  export let items = [];
  let cartItems = [];
  let subtotal = 0;

  // Function to fetch asset details
  async function fetchAssetDetails(assetId, token) {
    try {
      const response = await fetch(
        `http://localhost:3000/asset/details?assetId=${assetId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to fetch asset details:');
        return null;
      }
    } catch (error) {
      console.error('Error fetching asset details:', error);
      return null;
    }
  }

  // Fetch cart items from the backend
  onMount(async () => {
    try {
      const { userId, token } = get(authStore);

      // Call the API to fetch cart items
      const response = await fetch(
        `http://localhost:3000/cart/view?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log('Fetched Cart Items:', data.cartItems); // Log fetched d

        // Group items by assetId
        const groupedItems = {};
        data.cartItems.forEach((item) => {
          if (groupedItems[item.assetId]) {
            groupedItems[item.assetId].qty += 1;
          } else {
            groupedItems[item.assetId] = {
              assetId: item.assetId,
              paymailId: item.paymailId,
              qty: 1,
            };
          }
        });

        // Fetch details for each asset and update cart items
        const assetDetailsPromises = Object.keys(groupedItems).map(
          async (assetId) => {
            const details = await fetchAssetDetails(assetId, token);
            if (details) {
              return {
                assetId: details.assetId,
                assetName: details.assetName,
                price: details.price,
                category: details.category,
                imageUrl: details.images[0] || 'default-image-url.jpg',
                qty: groupedItems[assetId].qty,
                paymailId: groupedItems[assetId].paymailId,
              };
            }
          }
        );

        const assetDetails = await Promise.all(assetDetailsPromises);
        cartItems = assetDetails.filter(Boolean);

        // Calculate the subtotal
        subtotal = cartItems.reduce(
          (total, item) => total + item.price * item.qty,
          0
        );
      } else {
        console.error('Failed to fetch cart items:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  });
</script>

<section
  class=" px-16 py-6 bg-white dark:bg-gray-900 w-full bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900 h-full top-0 left-0 z-0 relative"
  style="background-image: linear-gradient(to bottom, var(--tw-gradient-stops) 25%);"
>
  <h1 class="text-3xl font-bold dark:text-gray-200">Shopping Cart 🛒</h1>
  <h2 class="text-md font-normal text-right dark:text-white">Price</h2>

  <hr class="h-px mb-4 bg-gray-200 border-0 dark:bg-gray-700" />

  {#if cartItems.length === 0}
    <p class="text-lg text-gray-600">Your cart is empty.</p>
  {:else}
    {#each cartItems as item}
      <div class="flex items-center mb-4 p-4">
        <!-- Product Image and Details -->
        <div class="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg">
          <img
            src={item.imageUrl}
            alt={item.assetName}
            class="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div class="ml-4 flex-1">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-300">
              {item.assetName}
            </h2>
            <p class="text-lg font-semibold text-gray-900 dark:text-gray-300">
              {(item.price * item.qty).toFixed(2)} SAT
            </p>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Paymail ID: {item.paymailId}
          </p>
          <p
            class="bg-primary-100 text-primary-800 text-sm inline-block font-medium mb-1 px-2.5 py-0.5 rounded-sm dark:bg-primary-900 dark:text-primary-300"
          >
            {item.category}
          </p>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Quantity: {item.qty}
          </p>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Unit Price: {item.price.toFixed(2)} SAT
          </p>
        </div>
      </div>
      <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
    {/each}

    <div
      class="flex items-center justify-between p-4 bg-white dark:text-gray-300 dark:bg-gray-900"
    >
      <p class="text-lg font-semibold text-gray-900 dark:text-gray-300">
        Subtotal ({cartItems.length} Items): {subtotal.toFixed(2)} SAT
      </p>

      <!-- <button
        class="bg-primary-700 text-white py-2 px-6 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
        ><div class="flex gap-1">
          <CartOutline /> Proceed to Checkout
        </div></button
      > -->
      <form action="?/pay" method="post">
        <input type="hidden" name="items" value={JSON.stringify(cartItems)} />
        <button
          type="submit"
          class="bg-primary-700 text-white py-2 px-6 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
          ><div class="flex gap-1">
            <CartOutline /> Proceed to Checkout
          </div></button
        >
      </form>
    </div>
  {/if}
</section>
