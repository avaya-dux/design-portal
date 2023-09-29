<script>
	import { fade, fly } from 'svelte/transition';

  const options = [
		{ label: 'Ease', motion: "ease" },
		{ label: 'Ease In', motion: "ease-in" },
		{ label: 'Ease Out', motion: "ease-out" }
	];

  let selected = options[0];
</script>

<div class="widget-container">
  <div class="options-panel">
    <select bind:value={selected}>
      {#each options as option}
        <option value={option}>{option.label}</option>
      {/each}
    </select>
  </div>
  <div class="animation-panel">
    {#if selected.motion=== "ease"}
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
