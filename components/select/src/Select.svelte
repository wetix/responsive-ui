<script lang="ts">
  import Select from "./MultipleSelect.svelte";
  import type { SelectOption } from "../types";

  let className = "";
  export { className as class };
  export let placeholder = "";
  export let ref: HTMLSelectElement;
  export let value: string | string[] = "";
  export let size = 10;
  export let multiple = false;
  export let options: SelectOption[] = [];

  // if not multiple, enforce it to size 1
  if (!multiple) size = 1;
</script>

{#if multiple}
  <Select {...$$props} {size} class={className} on:change on:blur />
{:else}
  <select
    class="resp-select {className}"
    bind:this={ref}
    {size}
    on:change
    on:blur
    bind:value
    {...$$restProps}
  >
    {#if placeholder}
      <option readonly hidden selected>{placeholder}</option>
    {/if}
    {#each options as option}
      <option value={option.value} disabled={option.disabled}
        >{option.label}</option
      >
    {/each}
  </select>
{/if}

<style lang="scss" global>
  $sm: 576px;

  .resp-select {
    display: inline-flex;
    border: 1px solid #f1f1f1;
    border-radius: var(--border-radius, 5px);
    font-size: var(--font-size);
    font-family: var(--font-family, inherit);
    height: 32px;
    line-height: 1.5;
    min-width: 120px;
    align-items: center;
    width: 100%;
    color: #1a1b1c;
    padding: 0 10px;
    background: #fff;
    outline: none;
    box-sizing: border-box;
    appearance: none;

    @media (min-width: $sm) {
      width: auto;
    }

    &:hover {
      border-color: #fc4451;
    }

    &:focus {
      border-color: #fc4451;
      box-shadow: 0 0 0 3px rgba(252, 68, 81, 0.3);
    }

    &::-ms-expand {
      display: none;
    }
  }
</style>
