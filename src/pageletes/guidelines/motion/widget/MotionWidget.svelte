<script>
	import { fade, fly, slide } from 'svelte/transition';
	import { quintIn, quintOut } from 'svelte/easing';

  let inMotion = true;
  let buttonLabel = "Ease Out";
  let easingFunc = quintIn;
  let speed = 150;

  const onMotionChange = () => {
    inMotion = !inMotion;
    if (inMotion) {
      easingFunc = quintOut;
      buttonLabel = "Ease Out";
    } else {
      easingFunc = quintIn;
      buttonLabel = "Ease In";
    }
  }

  const onSpeedChange = (event) => {
    speed = event.currentTarget.value;
  }
</script>

<div class="widget-container">
  <div class="options-panel">
    <div class="flex-left-item">
        <button on:click={onMotionChange} id="start-btn" class="neo-btn neo-btn-secondary neo-btn-secondary--default">
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
      <div class="boxy" transition:fly={{ duration: speed, easing: easingFunc, x:500 }}></div>
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
  flex: 122px;
  margin-top: 0.2rem;
  padding-left: 1rem;
}
.flex-right-item {
  flex: 86%;
  margin-top: 1rem;
}

.animation-panel {
  height: 200px;
  clip-path: inset(10px 20px 10px 20px)
}

.boxy {
  position: relative;
	top: 50px;
	left: 400px;
  border: 4px solid var(--neo-color-base-200);
  height: 100px;
  width: 100px;
}

#motion-select {
  margin-top: 5px;
}

#start-btn {
  height: 35px;
}
</style>
