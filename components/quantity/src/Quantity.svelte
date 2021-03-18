<script lang="ts">
  import Icon from "@responsive-ui/icon";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let min = 0;
  export let max = 10;
  export let value = 0;
  export let step = 1;
  export let disabled = false;

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
  class="responsive-ui-quantity {className}"
  class:responsive-ui-quantity--disabled={disabled}
  {...$$restProps}
>
  <span on:click={!disabled ? onDecrement : undefined}>
    <Icon type="minus" stroke={value > min ? "#505050" : "#ababab"} />
  </span>
  <span class="responsive-ui-quantity__count">{value}</span>
  <span on:click={!disabled ? onIncrement : undefined}>
    <Icon type="plus" stroke={value < max ? "#505050" : "#ababab"} />
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
      .responsive-ui-quantity__count {
        color: #bebebe;
      }

      // svg {
      //   stroke: #f5f5f5 !important;
      // }
    }
  }
</style>
