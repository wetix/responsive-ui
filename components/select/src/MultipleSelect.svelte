<script lang="ts">
  import { zoom, getNodeAttribute } from "./Select";
  import { onMount, createEventDispatcher } from "svelte";
  import type { SelectOption } from "../types";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let ref: HTMLElement;
  export let name = "";
  export let options: SelectOption[] = [];
  export let size = 10;
  export let value: string[] = [];
  export let disabled = false;
  export let readonly = false;

  let filteredOptions: SelectOption[] = options;

  const maxHeight = 15 + size * 24;

  type Item = { label: string; value: string; disabled?: boolean };

  const dict = new Map();
  $: {
    options.forEach((opt) => {
      dict.set(opt.value, opt);
    });
  }
  let input: HTMLInputElement;
  let focused = false;
  let clientHeight = 0;
  let activeOptionIdx = filteredOptions.findIndex((v) => !v.disabled);

  const findNodeByAttr = (e: Event, attr: string) => {
    const target = e
      .composedPath()
      .find(
        (el) => el instanceof Element && el.classList.contains("resp-select__option")
      );
    if (!target) return null;
    const option = (target as Element).getAttribute(attr);
    if (!option) return null;
    return option;
  };

  // handle select when user clicks
  const handleSelect = (e: Event) => {
    if (disabled) return;

    const option = findNodeByAttr(e, "data-option");
    if (!option) return;
    const [_, item] = <[number, Item]>JSON.parse(option);
    insertValue(item);
  };

  // insert value
  const insertValue = (item: Item) => {
    if (item.disabled || false) return;
    const pos = value.findIndex((v) => v === item.value);

    // remove if already exists
    if (pos > -1) {
      value.splice(pos, 1);
    } else {
      value.push(item.value);
    }

    // trigger re-render
    value = value;

    dispatch("change", value);

    input.value = "";
    filteredOptions = options;
    input.focus();
  };

  // handle remove when clicked
  const handleRemove = (e: Event) => {
    if (disabled) return;
    const val = getNodeAttribute(e, "data-value");
    if (val) {
      e.stopPropagation();
      value = value.filter((v) => v !== val);
      dispatch("change", value);
    }
  };

  // filter options when typing in input box
  const filterOptions = (e?: Event) => {
    activeOptionIdx = 0;
    filteredOptions = options.filter((v) => {
      return v.label.toLowerCase().includes(input.value.toLowerCase());
    });
  };

  // arrow keys function (on:keydown)
  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Backspace":
        if (input.value) return;
        value = value.slice(0, -1);
        break;
      case "ArrowUp":
        if (activeOptionIdx - 1 < 0) return;
        activeOptionIdx--;
        break;
      case "ArrowDown":
        if (activeOptionIdx + 1 > filteredOptions.length - 1) return;
        activeOptionIdx++;
        break;
      case "Enter":
        insertValue(filteredOptions[activeOptionIdx]);
        break;
    }
  };

  onMount(() => {
    // detect whether element is focused or not
    const onHide = (e: Event) => {
      if (!(ref as HTMLDivElement)!.contains(e.target as Node)) focused = false;
    };
    window.addEventListener("click", onHide);

    return () => {
      window.removeEventListener("click", onHide);
    };
  });
</script>

<div class="resp-select--multiple {className}" {...$$restProps} bind:this={ref}>
  <div
    class="resp-select__input"
    style="padding: 0;"
    class:resp-select__input--focused={focused}
    on:click={() => {
      focused = true;
      activeOptionIdx = 0;
    }}
  >
    <input {name} on:input on:change type="hidden" value={Array.isArray(value) ? value.join(",") : ""} />
    <span class="resp-select__tags" on:click={handleRemove}>
      {#each value as item}
        {#if dict.get(item)}
          <span class="resp-select__tag" data-value={item} in:zoom={{}}>
            <span>{dict.get(item).label}</span>
            <i class="resp-select__close" class:resp-select__close-disabled={disabled} />
          </span>
        {/if}
      {/each}
      <input
        bind:this={input}
        type="text"
        autocomplete="off"
        on:blur
        on:input={filterOptions}
        on:keydown={onKeyDown}
        {disabled}
        {readonly}
      />
    </span>
  </div>
  <div
    class="resp-select__dropdown"
    on:click={handleSelect}
    style={`height: ${
      focused && !disabled ? clientHeight : 0
    }px; max-height: ${maxHeight}px;`}
  >
    <div bind:clientHeight style="padding:10px 0">
      {#if filteredOptions.length > 0}
        {#each filteredOptions as option, i}
          <div
            class="resp-select__option"
            class:resp-select__option--disabled={option.disabled}
            class:resp-select__option--selected={value.includes(option.value)}
            class:resp-select__option--active={activeOptionIdx == i}
            data-option={JSON.stringify([i, option])}
            on:mouseover={() => (activeOptionIdx = i)}
            on:focus
          >
            {option.label || ""}
          </div>
        {/each}
      {:else}
        <div style="text-align: center;">NO RESULT</div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss" global>
  .resp-select {
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

    &__input {
      display: flex;
      width: 100%;
      border: 1px solid var(--input-border-color, #dcdcdc);
      border-radius: 3px;
      min-height: var(--height, 34px);
      color: #1a1b1c;
      background: #f1f1f1;
      outline: none;
      box-sizing: border-box;

      &--focused {
        border-color: #fc4451;
        box-shadow: 0 0 0 3px rgba(252, 68, 81, 0.3);
      }
    }

    &__tags {
      padding: 5px;
      row-gap: 5px;
      column-gap: 5px;
      display: inline-flex;
      width: 100%;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      box-sizing: border-box;
    }

    &__tag {
      cursor: default;
      font-size: var(--font-size-sm, 12px);
      border-radius: var(--border-radius-sm, 3px);
      padding: 3px 8px;
      background: #fff;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);

      span {
        vertical-align: middle;
        display: inline-block;
      }
    }

    &__close {
      cursor: pointer;
      position: relative;
      margin-left: 3px;
      vertical-align: middle;
      display: inline-block;
      width: 12px;
      height: 12px;

      &-disabled {
        cursor: unset !important;

        &:before,
        &:after {
          border-left: 1px solid #808080 !important;
        }
      }

      &:after {
        content: "";
        height: 12px;
        border-left: 1px solid #3b3b3b;
        position: absolute;
        transform: rotate(45deg);
        left: 5px;
      }

      &:before {
        content: "";
        height: 12px;
        border-left: 1px solid #3b3b3b;
        position: absolute;
        transform: rotate(-45deg);
        left: 5px;
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
      position: relative;
      cursor: pointer;
      white-space: nowrap;
      font-size: var(--font-size-sm, 12px);
      transition: all 0.3s;
      transition-property: background, color;
      padding: 3px 10px;
      margin-bottom: 1px;

      &--active {
        @media (hover) and (pointer: fine) {
          background: #f5f5f5;
        }
      }

      &--disabled {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.5;
      }

      &--selected {
        background: rgba(252, 68, 81, 0.1) !important;
      }
    }
  }
</style>
