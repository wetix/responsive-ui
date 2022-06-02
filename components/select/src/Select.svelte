<script lang="ts">
  import type { SelectOption } from "../types";
  import { getNodeAttribute } from "@wetix/utils";
  import { createEventDispatcher } from "svelte";

  let className = "";

  export { className as class };
  export let placeholder = "";
  export let options: SelectOption[] = [];
  export let open = false;
  export let disabled = false;

  let items: SelectOption[] = options;
  let selectedItem: SelectOption | null = null;
  let inputRef: HTMLInputElement;

  const dispatch = createEventDispatcher();

  const handleSearch = (e: Event) => {
    open = true;
    const val = (e.target as HTMLInputElement).value;
    if (!val) {
      items = options;
      return;
    }
    items = options.filter((v) => {
      return v.label.toLowerCase().includes(val.toLowerCase());
    });
  };

  const handleSelect = (e: Event) => {
    e.stopPropagation();
    const val = getNodeAttribute(e, "data-value");
    if (val) {
      selectedItem = JSON.parse(val as string);
      open = false;
      dispatch("select", selectedItem?.value);
    }
  };

  $: if (options) {
    items = options;
  }
  $: if (open && inputRef) {
    open === true ? inputRef.focus() : inputRef.blur();
  }
</script>

<div class="resp-select" {...$$restProps}>
  <input
    on:click={() => {
      open = !open;
    }}
    on:input={handleSearch}
    class="resp-select__input"
    type="text"
    {placeholder}
    value={selectedItem ? selectedItem.label : null}
    {disabled}
    bind:this={inputRef}
  />
  {#if open}
    <div class="resp-select__content" on:click={handleSelect}>
      {#if (items || []).length > 0}
        {#each items as item}
          <div class="resp-select__content-item" data-value={JSON.stringify(item)}>
            {item.label}
          </div>
        {/each}
      {:else}
        <div class="resp-select__content-item" style="cursor: not-allowed;">
          No data available.
        </div>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss" global>
  $sm: 576px;

  .resp-select {
    position: relative;
    display: inline-block;

    @media (max-width: $sm) {
      width: 100%;
    }

    &__input {
      display: inline-flex;
      cursor: pointer;
      border: 1px solid var(--input-border-color, #dcdcdc);
      border-radius: 3px;
      font-size: var(--font-size);
      font-family: var(--font-family, inherit);
      height: var(--input-height, 32px);
      line-height: 1.5;
      align-items: center;
      color: #1a1b1c;
      padding: 0 10px;
      width: 100%;
      margin-bottom: 0;
      background: #fff;
      outline: none;
      box-sizing: border-box;
      appearance: none;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon' viewBox='0 0 24 24' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' %3E%3Cpath d='M6 9l6 6 6-6' fill='%23b9b9b9' /%3E%3C/svg%3E")
        no-repeat;
      background-size: 16px;
      background-position: 98% 50%;

      &:hover {
        border-color: #fc4451;
      }

      &:disabled {
        cursor: not-allowed;
      }

      &:focus {
        border-color: #fc4451;
        box-shadow: 0 0 0 3px rgba(252, 68, 81, 0.3);
      }

      &::-ms-expand {
        display: none;
      }
    }

    &__content {
      background-color: white;
      z-index: 9999;
      box-sizing: border-box;
      position: absolute;
      width: 100%;
      word-wrap: break-word;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      max-height: 500px;
      overflow: hidden;
      overflow-y: scroll;

      &-item {
        cursor: pointer;
        padding: 2.5px 5px;
      }
      &-item:hover {
        background-color: lightgray;
      }
    }
  }

  .icon {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
    height: 24px;
  }
</style>
