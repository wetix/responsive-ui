<script lang="ts">
  import { onMount } from "svelte";
  import { custom_event } from "svelte/internal";

  custom_event("event", {}, true);

  let className = "";
  export { className as class };
  export let ref: HTMLInputElement;
  export let min = 0;
  export let max = 10;
  export let step = 1;
  export let value = 0;
  export let disabled = false;
  export let style = "";

  let toggle = false;
  onMount(() => {
    toggle = true;
  });

  const handleDecrement = () => {
    if (value > min) {
      const ratio = -step;
      value += ratio;
      ref.stepDown();
      // dispatch('change', {
      //   value,
      //   step: ratio
      // });
    }
  };

  const handleIncrement = () => {
    console.log("onIncrement", value, max);
    if (value < max) {
      const ratio = +step;
      value += ratio;
      ref.stepUp();
      // dispatch('change', {
      //   value,
      //   step: ratio
      // });
    }
  };
</script>

<div
  class="resp-quantity {className}"
  class:resp-quantity--toggle-mode={toggle}
  {style}
>
  {#if toggle}
    <span on:click={!disabled ? handleDecrement : null}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        width="1em"
        height="1em"
        viewBox="0 0 31.427 31.427"
        xml:space="preserve"
      >
        <path
          d="M1.111 16.832A1.117 1.117 0 010 15.706c0-.619.492-1.111
      1.111-1.111H30.3c.619 0 1.127.492 1.127 1.111s-.508 1.127-1.127
      1.127H1.111z"
          fill="red"
        />
      </svg>
    </span>
  {/if}
  <input bind:this={ref} type="number" value={`${value}`} {...$$restProps} />
  {#if toggle}
    <span on:click={!disabled ? handleIncrement : null}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        width="1em"
        height="1em"
        viewBox="0 0 31.427 31.427"
        xml:space="preserve"
      >
        <path
          d="M1.111 16.832A1.117 1.117 0 010 15.706c0-.619.492-1.111
      1.111-1.111H30.3c.619 0 1.127.492 1.127 1.111s-.508 1.127-1.127
      1.127H1.111z"
          fill="red"
        />
      </svg>
    </span>
  {/if}
</div>

<!-- <div class="controller" class:disabled>
  -->

<!--
</div> -->
<style lang="scss" global>
  .resp-quantity {
    display: inline-flex;
    align-items: center;
    border: 1px solid #dcdcdc;
    border-radius: 3px;

    /* Firefox */
    input[type="number"] {
      outline: none;
      -moz-appearance: textfield;
      height: var(--input-height, 30px);
      color: var(--theme-color);
      text-align: center;
      width: 65px;
    }

    &--toggle-mode {
      border: none;
    }

    &--focused,
    &:hover {
      border-color: #fc4451;
    }

    &--focused {
      border-color: #fc4451;
      box-shadow: 0 0 0 3px rgba(252, 68, 81, 0.3);
    }
  }

  /* Chrome, Safari, Edge, Opera */
  // input::-webkit-outer-spin-button,
  // input::-webkit-inner-spin-button {
  //   -webkit-appearance: none;
  //   margin: 0;
  // }

  // .controller {
  //   display: flex;
  //   flex-direction: row;
  //   align-items: center;
  //   transition: all 0.5s;

  //   .count {
  //     width: 20px;
  //     text-align: center;
  //     margin: 0 5px;
  //     color: var(--theme-color);
  //   }

  //   &.disabled {
  //     .count {
  //       color: #bebebe;
  //     }

  //     :global(svg) {
  //       stroke: #f5f5f5 !important;
  //     }
  //   }
  // }
</style>
