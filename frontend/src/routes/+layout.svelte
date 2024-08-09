<script>
  import { authStore } from '$lib/stores/authStore';
  import { redirect } from '@sveltejs/kit';
  import '../app.css';

  // @ts-ignore
  export async function load({ url }) {
    let isLoggedIn = false;

    // Access authStore
    const unsubscribe = authStore.subscribe((auth) => {
      isLoggedIn = auth.isLoggedIn;
    });

    // Unsubscribe to avoid memory leaks
    unsubscribe();

    // Redirect to login page if not logged in and trying to access protected pages
    if (!isLoggedIn && url.pathname.startsWith('/dashboard')) {
      throw redirect(302, '/login');
    }
  }
</script>

<slot></slot>
