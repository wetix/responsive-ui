<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let ref: null | HTMLInputElement = null;
  export let type = "text";
  export let bordered = true;
  export let value = "";

  const onKeyup = (e: KeyboardEvent) => {
    const v = (<HTMLInputElement>e.target).value;
    const key = e.key || e.keyCode;
    value = v;

    // when user click enter
    if (key === "Enter" || key === 13) {
      dispatch("enter", value);
    }
  };
</script>

<input
  {...$$restProps}
  class="responsive-ui-input {className}"
  class:responsive-ui-input--bordered={bordered}
  bind:this={ref}
  {value}
  {type}
  on:keyup={onKeyup}
  on:input
  on:change
/>

<style lang="scss">
  .responsive-ui-input {
    margin: 0;
    display: block;
    color: var(--text-color, #1a1b1c);
    background: #f1f1f1;
    font-size: var(--font-size, 14px);
    font-family: var(--font-family, inherit);
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    user-select: text;
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    padding: 0 10px;
    box-sizing: border-box;
    height: var(--height, 34px);
    line-height: var(--height, 34px);
    border: none;
    border-radius: var(--border-radius, 5px);

    &--bordered {
      border-color: #f1f1f1;
    }
  }
</style>
