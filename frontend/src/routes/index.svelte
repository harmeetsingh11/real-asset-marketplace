<script lang="ts">
  let name: string = 'World';

  function greet() {
    alert(`Hello, ${name}!`);
  }
</script>

<h1>Hello {name}!</h1>
<button on:click={greet}>Greet</button>
