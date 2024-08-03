<script lang="ts">
  let userId: string = 'some-user-id';

  const handleCheckout = async () => {
    const res = await fetch('http://localhost:3000/api/cart/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, cartId: 'some-cart-id' }),
    });
    const data = await res.json();
    if (data.status === 'success') {
      alert('Checkout successful!');
    }
  };
</script>

<h2>Checkout</h2>
<form on:submit|preventDefault={handleCheckout}>
  <button type="submit">Confirm Purchase</button>
</form>
