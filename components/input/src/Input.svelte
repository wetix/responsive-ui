<script lang="ts">
  import { onMount } from "svelte";

  let className = "";
  export { className as class };
  export let name = "";
  export let type = "text";
  export let placeholder = "";
  export let disabled = false;
  export let maxlength = 100;
  export let size = 100;
  export let value = "";
  export let autofocus = false;
  export let style = "";

  let input: null | HTMLInputElement;

  onMount(() => {
    if (input && autofocus) {
      input.focus();
    }
  });

  const onInput = (e: Event) => {
    value = (e.target as HTMLInputElement).value;
  };
</script>

<div class="responsive-ui-input {className}" {style}>
  <input
    bind:this={input}
    {name}
    {type}
    {placeholder}
    {maxlength}
    {size}
    {disabled}
    {value}
    {...$$restProps}
    on:input={onInput}
    on:input
    on:change
  />
</div>

<style lang="scss">
  .responsive-ui-input {
    display: block;

    input {
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
      border: 1px solid #f1f1f1;
      border-radius: var(--border-radius, 5px);
    }
  }
</style>
