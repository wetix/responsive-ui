<script lang="ts">
  import { zoom } from "@wetix/animation";
  import { getNodeAttribute } from "@wetix/utils";
  import { onMount } from "svelte";

  import type { SelectOption } from "../types";

  let className = "";
  export { className as class };
  export let name = "";
  export let options: SelectOption[] = [];
  export let size = 10;
  export let value: string[] = [];
  export let disabled = false;
  export let readonly = false;

  const maxHeight = 25 + size * 20;

  type Item = { title: string; value: string };

  let items: Item[] = [];
  let input: null | HTMLInputElement;
  let show = false;
  let clientHeight;

  onMount(() => {
    input.focus();
  });

  const onSelect = (e: Event) => {
    const data = getNodeAttribute(e, "data-option");
    if (data) {
      const [index, item] = <[number, Item]>JSON.parse(data);
      const pos = items.findIndex((v) => v.value === item.value);
      if (pos > -1) {
        options[index].selected = false;
        items = items.filter((v) => v.value !== item.value);
      } else {
        options[index].selected = true;
        items = [...items, item];
      }
      options = [...options];
      input.focus();
    }
  };

  const onClick = () => {
    show = !show;
  };

  const onRemove = (e: Event) => {
    const value = getNodeAttribute(e, "data-value");
    if (value) {
      e.stopPropagation();
      items = items.filter((v) => v.value !== value);
    }
  };
</script>

<div class="responsive-ui-select--multiple {className}">
  <div class="responsive-ui-select-input" on:click={onClick}>
    <input
      {name}
      type="hidden"
      value={items.reduce((acc, { value }, i) => {
        if (i > 0) acc += ",";
        return (acc += value);
      }, "")}
    />
    <span class="responsive-ui-select__tags" on:click={onRemove}>
      {#each items as item}
        <span class="responsive-ui-select__tag" in:zoom out:zoom>
          <span>{item.title}</span>
          <span
            class="responsive-ui-select__close-icon"
            data-value={item.value}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512.001 512.001"
              style="enable-background:new 0 0 512.001 512.001;"
              xml:space="preserve">
              <g>
                <path
                  d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
        L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
        c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
        l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
        L284.286,256.002z"
                />
              </g>
            </svg>
          </span>
        </span>
      {/each}
      <input
        bind:this={input}
        type="text"
        autocomplete="off"
        on:blur
        {disabled}
        {readonly}
      />
    </span>
  </div>
  <div
    class="responsive-ui-select__dropdown"
    on:click={onSelect}
    style={`height:${show ? clientHeight : 0}px; max-height: ${maxHeight}px;`}
  >
    <div bind:clientHeight style="padding:10px 0">
      {#each options as item, i}
        <div
          class="responsive-ui-select__option"
          class:responsive-ui-select__option--selected={item.selected}
          class:responsive-ui-select__option--disabled={item.disabled}
          data-option={JSON.stringify([i, item])}
        >
          {item.title || ""}
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .responsive-ui-select {
    &--multiple {
      position: relative;

      input[type="text"] {
        flex-grow: 1;
        min-width: 3px;
        margin: 0;
        padding: 0;
        font-size: var(--font-size, 14px);
        font-family: var(--font-family, inherit);
        outline: none;
        border: none;
        background: inherit;
      }
    }

    &-input {
      display: flex;
      width: 100%;
      border: 1px solid #f1f1f1;
      border-radius: var(--border-radius, 5px);
      min-height: var(--height, 34px);
      color: #1a1b1c;
      background: #f1f1f1;
      outline: none;
      box-sizing: border-box;
    }

    &__tags {
      display: inline-flex;
      padding: 4px 0 4px 10px;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    &__tag {
      // float: left;
      cursor: default;
      vertical-align: middle;
      display: inline-block;
      font-size: var(--font-size-sm, 12px);
      padding: 3px 6px;
      border-radius: var(--border-radius-sm, 3px);
      margin-right: 4px;
      margin-bottom: 4px;
      background: #fff;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
    }

    &__close-icon {
      cursor: pointer;
      margin-left: 3px;
      display: inline-block;
      width: 8px;
      height: 8px;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    &__dropdown {
      position: absolute;
      top: 120%;
      background: #fff;
      left: 0;
      min-width: 100%;
      margin: 0;
      padding: 0;
      user-select: none;
      overflow-x: hidden;
      overflow-y: auto;
      transition: all 0.5s;
      border-radius: var(--border-radius, 5px);
      box-shadow: 0 0 26px rgba(0, 0, 0, 0.15);
      max-height: 200px;
      z-index: 10;
    }

    &__option {
      cursor: pointer;
      position: relative;
      white-space: nowrap;
      font-size: var(--font-size-sm, 12px);
      transition: all 0.3s;
      transition-property: background, color;
      padding: 3px 10px;
      margin-bottom: 1px;

      &:hover {
        background: #f5f5f5;
      }

      &--disabled {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.5;
      }

      &--selected {
        background: rgba(252, 68, 81, 0.3) !important;
      }
    }
  }
</style>
