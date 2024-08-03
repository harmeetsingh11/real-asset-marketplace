<script lang="ts">
  import { login } from '$lib/stores/authStore';

  let email: string = '';
  let password: string = '';
  let confirmPassword: string = '';

  const handleRegister = async (e: Event) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      login(data.token);
    }
  };
</script>

<h2>Create Your Account</h2>
<form on:submit|preventDefault={handleRegister}>
  <label>
    Email
    <input
      type="email"
      bind:value={email}
      placeholder="Enter your email"
      required
    />
  </label>
  <label>
    Password
    <input
      type="password"
      bind:value={password}
      placeholder="Create a password"
      required
    />
  </label>
  <label>
    Confirm Password
    <input
      type="password"
      bind:value={confirmPassword}
      placeholder="Confirm your password"
      required
    />
  </label>
  <button type="submit">Register</button>
</form>
<p>Already have an account? <a href="/login">Login here</a></p>
