<script>
	import { fade, fly, slide } from 'svelte/transition';
	import { sineIn, sineOut } from 'svelte/easing';

  const options = [
		{ label: 'Ease', motion: "ease" },
		{ label: 'Ease In', motion: "ease-in" },
		{ label: 'Ease Out', motion: "ease-out" }
	];

  let selected = options[0];
  let inMotion = true;
  let buttonLabel = "Ease Out";
  let easingFunc = sineIn;
  let speed = 150;

  const onMotionChange = () => {
    inMotion = !inMotion;
    if (inMotion) {
      easingFunc = sineOut;
      buttonLabel = "Ease Out";
    } else {
      easingFunc = sineIn;
      buttonLabel = "Ease In";
    }
  }

  const onSpeedChange = (event) => {
    speed = event.currentTarget.value;
  }
</script>

<div class="widget-container">
  <div class="options-panel">
    <div class="neo-select flex-left-item">
      <label for="start-btn">Motion Options</label>
        <button on:click={onMotionChange} id="start-btn" class="neo-btn neo-btn-primary neo-btn-primary--default">
          {buttonLabel}
        </button>
    </div>
      <form class="neo-form flex-right-item">
        <div class="neo-form-control">
          <div class="neo-input-group">
            <div class="neo-input-group--inline" role="radiogroup" aria-labelledby="top-label">
              <input
                checked={speed===150}
                on:change={onSpeedChange}
                class="neo-radio"
                type="radio"
                name="Select Option"
                value="150"
                id="fast"
                role="radio"
                aria-checked="false"
              >
              <label for="fast">
                Fast
              </label>
              <input
                checked={speed===400}
                on:change={onSpeedChange}
                class="neo-radio"
                type="radio"
                name="Select Option"
                value="400"
                id="medium"
                role="radio"
                aria-checked="false"
              >
              <label for="medium">
                Medium
              </label>
              <input
                checked={speed===900}
                on:change={onSpeedChange}
                class="neo-radio"
                type="radio"
                name="Select Option"
                value="900"
                id="slow"
                role="radio"
                aria-checked="false"
              >
              <label for="slow">
                Slow
              </label>
            </div>
          </div>
        </form>
  </div>
  <div class="animation-panel">
    {#if inMotion}
      <div class="boxy" transition:fly={{ duration: speed, easing: quintIn, x:500 }}></div>
    {/if}
  </div>
</div>


<style>
.widget-container {
  border: 1px solid var(--neo-color-base-200);
}

.options-panel {
  border-bottom: 1px solid var(--neo-color-base-200);

  display: flex;

  flex-direction: row;
  gap: 1.2rem;
  align-items: center;
}

.flex-left-item {
  flex: 30%;
  margin-top: 0.8rem;
  padding-left: 1rem;
}
.flex-right-item {
  flex: 70%;
  margin-top: 2.2rem;
}

.animation-panel {
  height: 200px;
  clip-path: inset(10px 20px 10px 20px)
}

.boxy {
  position: relative;
		top: 10px;
		left: 400px;
  border: 4px solid var(--neo-color-base-200);
  height: 100px;
  width: 100px;
  /* transition: transform 1s; */
}

/* .animation-panel:hover .boxy {
  transform: translateX(100%);
} */

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  background: #ddd;
  padding: 16px;
  height: 100vh;
  width: 200px;
  border-left: 1px solid rgba(0, 0, 0, .1);
  box-shadow: -2px 0px 6px -1px rgba(0, 0, 0, 0.1);
}

#motion-select {
  margin-top: 5px;
}

#start-btn {
  height: 35px;
}
</style>
