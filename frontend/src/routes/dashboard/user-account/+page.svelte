<script>
  import { UserSettingsSolid } from 'flowbite-svelte-icons';

  let userId = '123456789';
  let email = 'user@example.com';
  let currentPassword = '';
  let newPassword = '';
  let confirmPassword = '';

  function handleChangePassword() {
    // Add your password change logic here
    console.log('Change password clicked');
  }
</script>

<section
  class="flex justify-center items-center py-10 px-auto shadow-md dark:bg-gray-900 bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900 h-full top-0 left-0 z-0 relative"
  style="background-image: linear-gradient(to bottom, var(--tw-gradient-stops) 70%);"
>
  <div
    class="max-w-2xl w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
  >
    <div class="flex items-center space-x-4">
      <div
        class="relative w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
      >
        <svg
          class="absolute w-16 h-16 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path></svg
        >
      </div>

      <div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
          Account Settings ⚙️
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          User ID: {userId}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">Email: {email}</p>
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Change Password
      </h3>
      <form class="mt-4 space-y-4">
        <div>
          <label
            for="current-password"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Current Password</label
          >
          <input
            type="password"
            id="current-password"
            bind:value={currentPassword}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-sm"
            placeholder="Enter your current password"
          />
        </div>

        <div>
          <label
            for="new-password"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >New Password</label
          >
          <input
            type="password"
            id="new-password"
            bind:value={newPassword}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-sm"
            placeholder="Enter your new password"
          />
        </div>

        <div>
          <label
            for="confirm-password"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Confirm New Password</label
          >
          <input
            type="password"
            id="confirm-password"
            bind:value={confirmPassword}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-sm"
            placeholder="Confirm your new password"
          />
        </div>

        <button
          type="button"
          on:click={handleChangePassword}
          class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-400 w-full justify-center"
        >
          Change Password
        </button>
      </form>
    </div>
  </div>
</section>
