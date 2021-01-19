<script lang="ts">
  import Select from "./MultipleSelect.svelte";
  import type { SelectOption } from "../types";

  let className = "";
  export { className as class };
  export let name = "";
  export let value = "";
  export let size = 1;
  export let multiple = false;
  export let disabled = false;
  export let readonly = false;
  export let options: SelectOption[] = [];
</script>

{#if multiple}
  <Select {...$$props} class={className} />
{:else}
  <select
    class="responsive-ui-select {className}"
    {multiple}
    {name}
    size={1}
    {readonly}
    {disabled}
    on:blur>
    {#each options as option}
      <option
        value={option.value}
        selected={option.selected ? option.selected : option.value === value}
        >{option.title}</option
      >
    {/each}
  </select>
{/if}

<style lang="scss">
  .responsive-ui-select {
    display: block;
    width: 100%;
    border: 1px solid #f1f1f1;
    border-radius: var(--border-radius, 5px);
    font-size: var(--font-size, 14px);
    font-family: var(--font-family, inherit);
    height: var(--height, 34px);
    color: #1a1b1c;
    padding: 0 10px;
    background: #f1f1f1;
    outline: none;
    box-sizing: border-box;
    /* hide arrow */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &::-ms-expand {
      display: none;
    }
  }
</style>
