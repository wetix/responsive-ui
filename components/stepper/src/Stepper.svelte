<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { StepperItem } from "../types";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let current = 0;
  export let items: StepperItem[] = [];

  $: percent = (current / items.length) * 100;
  $: circle = (percent / 100) * 100 * Math.PI + ",9999";

  $: {
    dispatch("change", current);
  }
</script>

<div class="responsive-ui-stepper {className}">
  <div class="responsive-ui-stepper__progress">
    <span class="responsive-ui-stepper__percent">{`${percent.toFixed()}%`}</span
    >
    <svg
      class="responsive-ui-stepper__progress-circle"
      viewBox="0 0 106 106"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-17.000000, -17.000000)">
          <circle
            stroke="#949494"
            stroke-width="5"
            fill-rule="nonzero"
            cx="70"
            cy="70"
            r="50"
          />
          <path
            d="M70,120 C97.6142375,120 120,97.6142375 120,70 C120,42.3857625 97.6142375,20 70,20 C42.3857625,20 20,42.3857625 20,70 C20,97.6142375 42.3857625,120 70,120 Z"
            stroke="#00ff00"
            stroke-width="5"
            stroke-dasharray={circle}
            fill-rule="nonzero"
            transform="translate(70.000000, 70.000000) rotate(-125.000000) translate(-70.000000, -70.000000)"
          />
        </g>
      </g>
    </svg>
  </div>
  <div class="responsive-ui-stepper__header">
    <div class="responsive-ui-stepper__header-current">
      {current < items.length ? items[current].label : "Completed"}
    </div>
    <div>
      {#if current < items.length && items[current].description}
        {items[current].description}
      {/if}
    </div>
    <div class="responsive-ui-stepper__header-next">
      {current < items.length - 1 ? `Next: ${items[current + 1].label}` : ""}
    </div>
  </div>
</div>

<style lang="scss">
  .responsive-ui-stepper {
    display: flex;
    align-items: center;
    // justify-content: space-between;

    &__progress {
      display: inline-flex;
      padding: 0;
      margin: 0;
      position: relative;
      margin-right: 15px;
    }

    &__percent {
      position: absolute;
      top: calc(50% - var(--font-size, 14px));
      text-align: center;
      width: 100%;
    }

    &__progress-circle {
      max-width: 75px;
      max-height: 75px;
      width: 100%;
      transform: scaleX(-1) rotate(-55deg);

      path {
        transition: 0.5s ease-in-out all;
      }
    }

    &__header {
      // text-align: right;

      &-current {
        font-size: var(--font-size-lg, 16px);
        font-weight: 600;
      }

      &-next {
        margin-top: 6px;
        font-size: var(--font-size-sm, 12px);
      }
    }
  }
</style>
