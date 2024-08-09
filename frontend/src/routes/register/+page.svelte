<script>
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import { onMount } from 'svelte';
  import { FlatToast, ToastContainer, toasts } from 'svelte-toasts';

  const showToast = (
    /** @type {string} */ message,
    /** @type {string} */ type
  ) => {
    toasts.add({
      description: message,
      duration: 2500, // duration
      placement: 'top-right',
      // @ts-ignore
      type: type || 'info', // Fallback type
      theme: 'dark',
    });
  };

  onMount(() => {
    const registerSuccess = localStorage.getItem('registerSuccess');
    if (registerSuccess) {
      showToast('Registered successfully! Please log in.', 'success');
      localStorage.removeItem('registerSuccess'); // Clear the flag
    }
  });

  // @ts-ignore
  const handleRegister = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        showToast(
          'Registration successful! Redirecting to login...',
          'success'
        );
        setTimeout(() => {
          localStorage.setItem('registerSuccess', 'true'); // Set the flag
          window.location.href = '/login';
        }, 2000); // Redirect after 1 second
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || 'Registration failed due to an unknown error.';
        showToast(`Registration failed: ${errorMessage}`, 'error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // @ts-ignore
      const errorMessage = error.message || 'An unexpected error occurred.';
      showToast(`An error occurred: ${errorMessage}`, 'error');
    }
  };
</script>

<Navbar />
<section
  class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center relative bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900 w-full h-full top-0 left-0 z-0"
  style="background-image: linear-gradient(to bottom, var(--tw-gradient-stops) 70%);"
>
  <div
    class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16"
  >
    <div class="flex flex-col justify-center">
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        Your Gateway to Real-World Assets
      </h1>
      <p
        class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
      >
        At RealAssetXchange, we bridge the gap between traditional assets and
        the digital economy, offering a seamless platform for buying, selling,
        and investing in real-world assets.
      </p>
      <a
        href="#"
        class="text-primary-600 dark:text-primary-500 hover:underline font-medium text-lg inline-flex items-center"
        >Read more about our app
        <svg
          class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
    <div>
      <div
        class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800"
      >
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Sign up for RealAssetXchange
        </h2>
        <form class="mt-8 space-y-6" on:submit|preventDefault={handleRegister}>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                name="remember"
                type="checkbox"
                class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div class="ms-3 text-sm">
              <label
                for="remember"
                class="font-medium text-gray-500 dark:text-gray-400"
                >Remember this device</label
              >
            </div>
            <a
              href="#"
              class="ms-auto text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Lost Password?</a
            >
          </div>
          <button
            type="submit"
            class="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >Create your account</button
          >
          <div class="text-sm font-medium text-gray-900 dark:text-white">
            Already registered? <a
              href="/login"
              class="text-primary-600 hover:underline dark:text-primary-500"
              >Sign in</a
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
<ToastContainer let:data>
  <FlatToast {data} />
  <!-- Provider template for your toasts -->
</ToastContainer>
<Footer />
