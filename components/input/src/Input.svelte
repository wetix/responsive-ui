<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let ref: null | HTMLInputElement = null;
  export let name = "";
  export let type = "text";
  export let bordered = true;
  export let placeholder = "";
  export let disabled = false;
  export let maxlength = 100;
  export let size = 100;
  export let value = "";
  export let style = "";

  const handleKeyup = (e: KeyboardEvent) => {
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
  class="responsive-ui-input {className}"
  class:responsive-ui-input--bordered={bordered}
  {style}
  bind:this={ref}
  {name}
  {type}
  {placeholder}
  {maxlength}
  {size}
  {disabled}
  {value}
  on:keyup={handleKeyup}
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
    border: 1px solid transparent;
    border-radius: var(--border-radius, 5px);

    &--bordered {
      border-color: #f1f1f1;
    }
  }
</style>
