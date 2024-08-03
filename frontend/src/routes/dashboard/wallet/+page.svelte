<script lang="ts">
  let selectedWallet: string | null = null;

  const connectWallet = async () => {
    if (selectedWallet) {
      const res = await fetch('http://localhost:3000/api/wallet/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'some-user-id',
          walletAddress: selectedWallet,
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        alert('Wallet connected successfully!');
      }
    }
  };
</script>

<h2>Connect Your Wallet</h2>
<div>
  <label>
    Select your wallet:
    <select bind:value={selectedWallet}>
      <option value="wallet1">Wallet 1</option>
      <option value="wallet2">Wallet 2</option>
    </select>
  </label>
  <button on:click={connectWallet}>Connect Wallet</button>
</div>
