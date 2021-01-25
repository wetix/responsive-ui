<script>
  import Icon from "@responsive-ui/icon";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let min = 0,
    max = 10,
    value = 0,
    step = 1,
    disabled = false;

  const onDecrement = () => {
    if (value > min) {
      const ratio = -step;
      value += ratio;
      dispatch("change", {
        value,
        step: ratio,
      });
    }
  };

  const onIncrement = () => {
    if (value < max) {
      const ratio = +step;
      value += ratio;
      dispatch("change", {
        value,
        step: ratio,
      });
    }
  };
</script>

<div
  class="responsive-ui-quantity"
  class:responsive-ui-quantity--disabled={disabled}
>
  <span on:click={!disabled ? onDecrement : null}>
    <Icon
      type="minus"
      stroke={value > min ? "#505050" : "#ababab"}
      width="12"
      height="12"
    />
  </span>
  <span class="responsive-ui-quantity__count">{value}</span>
  <span on:click={!disabled ? onIncrement : null}>
    <Icon
      type="plus"
      stroke={value < max ? "#505050" : "#ababab"}
      width="12"
      height="12"
    />
  </span>
</div>

<style lang="scss">
  .responsive-ui-quantity {
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: all 0.5s;

    &__count {
      width: 20px;
      text-align: center;
      margin: 0 5px;
      color: black;
    }

    &--disabled {
      .count {
        color: #bebebe;
      }

      :global(svg) {
        stroke: #f5f5f5 !important;
      }
    }
  }
</style>
