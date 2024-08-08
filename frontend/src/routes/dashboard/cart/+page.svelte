<script>
  import { CartOutline } from 'flowbite-svelte-icons';

  // Sample cart items
  let cartItems = [
    {
      id: 1,
      name: 'Vintage Watch',
      category: 'Watches',
      quantity: 2,
      price: 500,
      imageUrl:
        'https://vintagecarforwedding.com/wp-content/uploads/2021/06/Honeyview__LAK8572-2.jpg',
    },
    {
      id: 2,
      name: 'Leather Sofa',
      category: 'Furniture',
      quantity: 1,
      price: 500,
      imageUrl:
        'https://vintagecarforwedding.com/wp-content/uploads/2021/06/Honeyview__LAK8572-2.jpg',
    },
  ];

  // Calculate total price
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
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
        <div class="flex-shrink-0 w-32 h-32 bg-gray-100">
          <img
            src={item.imageUrl}
            alt={item.name}
            class="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div class="ml-4 flex-1">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-300">
              {item.name}
            </h2>
            <p class="text-lg font-semibold text-gray-900 dark:text-gray-300">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <p
            class="bg-primary-100 text-primary-800 text-sm inline-block font-medium mb-1 px-2.5 py-0.5 rounded-sm dark:bg-primary-900 dark:text-primary-300"
          >
            {item.category}
          </p>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Quantity: {item.quantity}
          </p>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Unit Price: ${item.price.toFixed(2)}
          </p>
        </div>
      </div>
      <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
    {/each}

    <div
      class="flex items-center justify-between p-4 bg-white dark:text-gray-300 dark:bg-gray-900"
    >
      <p class="text-lg font-semibold text-gray-900 dark:text-gray-300">
        Subtotal ({cartItems.length} Items): ${subtotal.toFixed(2)}
      </p>

      <button
        class="bg-primary-700 text-white py-2 px-6 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
        ><div class="flex gap-1">
          <CartOutline /> Proceed to Checkout
        </div></button
      >
    </div>
  {/if}
</section>
