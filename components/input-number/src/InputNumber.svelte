<script lang="ts">
  import { onMount } from "svelte";

  let className = "";
  export { className as class };
  export let name = "";
  export let min = 0;
  export let max = 100000;
  export let label: null | string;
  export let placeholder = "";
  export let parser = (v: string) => v;
  export let formatter = (v: string) => v;
  export let maxlength = "";
  export let size = 100;
  export let value = "";
  export let autofocus = false;

  let active = false;
  let input: null | HTMLInputElement;

  onMount(() => {
    if (input && autofocus) {
      input.focus();
    }
  });

  const onInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    value = val;
    console.log(value);
    // onChange(e);
    // if (value.trim() != "") {
    //   active = true;
    // } else {
    //   active = false;
    // }
  };
</script>

<style lang="scss">
  .responsive-ui-input-number {
    display: block;
    margin: 0;

    input {
      display: block;
      border: none;
      color: #1a1b1c;
      background: #f1f1f1;
      font-size: var(--font-size, 14px);
      font-family: inherit;
      border-radius: 0;
      outline: none;
      border-bottom: 1px solid #e1e1e1;
      width: 100%;
      user-select: text;
      -webkit-user-select: text;
      -khtml-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      padding: 0 10px;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      border: none;
      border-radius: var(--border-radius, 5px);
    }
  }

  .label {
    font-size: 1rem;
    margin-bottom: 6px;
    transition: all 0.3s;

    &.active {
      font-size: 0.8rem;
      color: #505050;
    }
  }
</style>

<div class="responsive-ui-input-number {className}">
  {#if label}
    <div class="label" class:active>{label}</div>
  {/if}
  <input
    {name}
    type="text"
    pattern="\d*"
    {placeholder}
    {value}
    bind:this={input}
    {...$$restProps}
    on:input={onInput} />
</div>
