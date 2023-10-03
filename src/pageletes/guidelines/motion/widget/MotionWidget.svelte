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
    <div class="neo-select flex-left-item">
      <label for="motion-select">Type</label>
      <select id="motion-select" bind:value={selected}>
        {#each options as option}
          <option value={option}>{option.label}</option>
        {/each}
      </select>
    </div>
      <form class="neo-form flex-right-item">
        <div class="neo-form-control">
          <div class="neo-input-group">
            <label id="top-label" for="Select Option">
              Select Option
            </label>
            <div class="neo-input-group--inline" role="radiogroup" aria-labelledby="top-label">
              <input
                class="neo-radio"
                type="radio"
                name="Select Option"
                value="Calendar"
                id="calendar"
                role="radio"
                aria-checked="false"
              >
              <label for="calendar">
                Calendar
              </label>
              <input
                class="neo-radio"
                type="radio"
                name="Select Option"
                value="Calculator"
                id="calculator"
                role="radio"
                aria-checked="false"
              >
              <label for="calculator">
                Calculator
              </label>
              <input
                class="neo-radio"
                type="radio"
                name="Select Option"
                value="Notes"
                id="notes"
                role="radio"
                aria-checked="false"
              >
              <label for="notes">
                Notes
              </label>
            </div>
          </div>
      </form>
  </div>
  <div class="animation-panel">
    {#if selected.motion=== "ease"}
      <div class="boxy"></div>
    {/if}
  </div>
</div>


<style>
.widget-container {
  border: 1px solid var(--neo-color-base-200);
  height: 400px;
}

.options-panel {
  border-bottom: 1px solid var(--neo-color-base-200);

  display: flex;

  flex-wrap: no-wrap;
  flex-direction: row;
  gap: 20px;
}

.flex-left-item {
  flex: 30%;
  padding: 10px;
}
.flex-right-item {
  flex: 70%;
}

.boxy {
  position: relative;
		top: 400px;
		left: 400px;
  border: 4px solid var(--neo-color-base-200);
  height: 100px;
  width: 100px;
}
</style>
