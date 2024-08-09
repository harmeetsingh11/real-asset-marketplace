<script>
  // @ts-nocheck

  import { authStore } from '$lib/stores/authStore';
  import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
  import { get } from 'svelte/store';

  const showToast = (
    /** @type {string} */ message,
    /** @type {string} */ type
  ) => {
    toasts.add({
      description: message,
      duration: 2500, // duration
      placement: 'top-right',
      type: type || 'info', // Fallback type
      theme: 'dark',
    });
  };

  const listAsset = async (event) => {
    event.preventDefault();
    const assetData = {
      assetName: event.target.name.value,
      description: event.target.description.value,
      price: Number(event.target.price.value),
      category: event.target.category.value,
      images: [event.target.url.value],
    };

    const { userId, token } = get(authStore); // Retrieve userId from the store

    if (!userId || !token) {
      showToast('User is not logged in or userId is missing.', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/asset/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token for authentication
        },
        body: JSON.stringify({ userId, ...assetData }),
      });

      if (response.ok) {
        const result = await response.json();
        showToast(
          `Asset listed successfully! Redirecting to marketplace`,
          'success'
        );
        setTimeout(() => {
          window.location.href = '/dashboard/marketplace';
        }, 2000);
        return result; // { assetId, status }
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || 'Failed to list the asset. Try again.';
        showToast(`Oops!: ${errorMessage}`, 'error');
        return null;
      }
    } catch (error) {
      // @ts-ignore
      const errorMessage = error.message || 'An unexpected error occurred.';
      showToast(
        `An error occurred while listing the asset: ${errorMessage}`,
        'error'
      );
      return null;
    }
  };
</script>

<section
  class="bg-white dark:bg-gray-900 bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900 w-full h-full top-0 left-0 z-0 flex items-center justify-center relative"
  style="background-image: linear-gradient(to bottom, var(--tw-gradient-stops) 50%);"
>
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
      Add a New Asset to your Marketplace Collection 🚀
    </h2>
    <form on:submit|preventDefault={listAsset}>
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div class="sm:col-span-2">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Name</label
          >
          <input
            type="text"
            name="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Enter the asset name (e.g., Vintage Car)"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Description</label
          >
          <textarea
            id="description"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Provide a detailed description of the asset"
          ></textarea>
        </div>
        <div>
          <label
            for="category"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Category</label
          >
          <select
            id="category"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option selected>Select category</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Machinery">Machinery</option>
            <option value="Furniture">Furniture</option>
            <option value="Antiques">Antiques</option>
            <option value="Stocks">Stocks</option>
            <option value="Bonds">Bonds</option>
            <option value="Watches">Watches</option>
            <option value="Vehicles">Vehicles</option>
          </select>
        </div>
        <div class="w-full">
          <label
            for="price"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Price</label
          >
          <input
            type="number"
            name="price"
            id="price"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="$2999"
            required
          />
        </div>
      </div>
      <div class="w-full">
        <label
          for="url"
          class="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
          >Image URL</label
        >
        <input
          type="url"
          name="url"
          id="url"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Paste the link to your asset image (e.g., https://drive.google.com/...)"
          required
        />
      </div>
      <button
        type="submit"
        class="inline-flex items-center justify-center w-full px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Add your Asset
      </button>
    </form>
  </div>
  <ToastContainer let:data>
    <FlatToast {data} />
    <!-- Provider template for your toasts -->
  </ToastContainer>
</section>
