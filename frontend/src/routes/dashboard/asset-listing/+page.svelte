<script lang="ts">
    let assetName: string = '';
    let description: string = '';
    let price: number | null = null;
    let category: string = '';
    let image: File | null = null;
  
    const listAsset = async (e: Event) => {
      e.preventDefault();
      if (price === null) return;
  
      const formData = new FormData();
      formData.append('assetName', assetName);
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('category', category);
      if (image) {
        formData.append('image', image);
      }
  
      const res = await fetch('http://localhost:3000/api/asset/list', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.status === 'success') {
        alert('Asset listed successfully!');
      }
    };
  </script>
  
  <h2>List Your Asset</h2>
  <form on:submit|preventDefault={listAsset}>
    <label>
      Asset Name
      <input type="text" bind:value={assetName} placeholder="Asset Name" required />
    </label>
    <label>
      Description
      <textarea bind:value={description} placeholder="Description" required></textarea>
    </label>
    <label>
      Price
      <input type="number" bind:value={price} placeholder="Price" required />
    </label>
    <label>
      Category
      <input type="text" bind:value={category} placeholder="Category" required />
    </label>
    <label>
      Upload Image
      <input type="file" accept="image/*" on:change={(e) => image = (e.target as HTMLInputElement).files?.[0] || null} />
    </label>
    <button type="submit">List Asset</button>
  </form>
  