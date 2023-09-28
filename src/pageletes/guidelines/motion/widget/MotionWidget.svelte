<script>
	import { fade, fly } from 'svelte/transition';
	let visible = true;
</script>

<div class="widget-container">
  <div class="options-panel">
    <label>
      <input type="checkbox" bind:checked={visible} />
      visible
    </label>
  </div>
  <div class="animation-panel">
    {#if visible}
      <p in:fly={{ y: 100, duration: 2000 }} out:fade>Flies in, fades out</p>
    {/if}
  </div>
</div>


<style>
.widget-container {
  border: 1px solid var(--neo-color-base-200);
  height: 400px;
}
</style>
