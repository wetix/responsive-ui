<script lang="ts">
  import { onMount } from "svelte";

  export let name = "";
  export let label: null | string;
  export let type = "text";
  export let placeholder = "";
  export let maxlength = "";
  export let size = 100;
  export let value = "";
  export let autofocus = false;
  // export let secondary = false;
  // export let onChange = (_: Event) => {};
  // export let onBlur = (_: Event) => {};
  // export let onEnterDown = (_: string) => {};
  // export let clearOnEnter = false;

  let active = false;
  let input: null | HTMLInputElement;

  onMount(() => {
    if (input && autofocus) {
      input.focus();
    }
    // if (input) {
    //   input.addEventListener("keydown", (e: KeyboardEvent) => {
    //     if (e.code === "Enter") {
    //       onEnterDown(input.value);
    //       if (clearOnEnter) {
    //         value = "";
    //         input.value = "";
    //       }
    //     }
    //   });
    // }
  });

  const onInput = (e: Event) => {
    value = (e.target as HTMLInputElement).value;
    // onChange(e);
    // if (value.trim() != "") {
    //   active = true;
    // } else {
    //   active = false;
    // }
  };
</script>

<style lang="scss">
  .responsive-ui-input {
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
      padding: 10px;
      border: none;
      border-radius: 5px;
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

<div class="responsive-ui-input">
  {#if label}
    <div class="label" class:active>{label}</div>
  {/if}
  <input
    {name}
    {type}
    {placeholder}
    {value}
    bind:this={input}
    {...$$restProps}
    on:input={onInput} />
</div>
