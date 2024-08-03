<script lang="ts">
  import { login } from '$lib/stores/authStore';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let email = '';
  let password = '';
  let message = '';

  async function handleSubmit() {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      login(data.token);
      message = 'You have successfully logged in.';
      setTimeout(() => goto('/dashboard'), 2000); // Redirect to dashboard after 2 seconds
    } else {
      message = 'Login failed';
    }
  }
</script>

<section class="p-8 flex justify-center items-center min-h-screen">
  <div class="w-full max-w-md">
    <h1 class="text-4xl font-bold text-center">Welcome Back</h1>
    {#if message}
      <p class="mt-4 text-center">{message}</p>
    {/if}
    <form class="mt-4" on:submit|preventDefault={handleSubmit}>
      <label for="email" class="block">Enter your email</label>
      <input
        type="email"
        id="email"
        class="border p-2 w-full"
        bind:value={email}
      />

      <label for="password" class="block mt-4">Enter your password</label>
      <input
        type="password"
        id="password"
        class="border p-2 w-full"
        bind:value={password}
      />

      <button class="mt-4 bg-blue-500 text-white p-2 w-full">Login</button>
    </form>
    <p class="mt-4 text-center">
      Don't have an account? <a href="/register" class="text-blue-500"
        >Register now</a
      >
    </p>
  </div>
</section>
