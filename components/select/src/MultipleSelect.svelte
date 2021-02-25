<script lang="ts">
  import { zoom } from "@wetix/animation";
  import { getNodeAttribute } from "@wetix/utils";
  import { onMount, createEventDispatcher } from "svelte";

  import type { SelectOption } from "../types";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let ref: null | HTMLDivElement = null;
  export let name = "";
  export let options: SelectOption[] = [];
  export let size = 10;
  export let value: string[] = [];
  export let disabled = false;
  export let readonly = false;

  const maxHeight = 15 + size * 24;

  type Item = { label: string; value: string };

  const dict = new Map();
  $: {
    options.forEach((opt) => {
      dict.set(opt.value, opt);
    });
  }
  let input: null | HTMLInputElement;
  let show = false;
  let clientHeight = 0;

  onMount(() => {
    const onHide = (e: Event) => {
      if (!ref!.contains(e.target as Node)) show = false;
    };
    window.addEventListener("click", onHide);

    return () => {
      window.removeEventListener("click", onHide);
    };
  });

  const onSelect = (e: Event) => {
    const data = getNodeAttribute(e, "data-option");
    if (data) {
      const [_, item] = <[number, Item]>JSON.parse(data);
      const pos = value.findIndex((v) => v === item.value);
      if (pos > -1) {
        value.splice(pos, 1);
      } else {
        value.push(item.value);
      }
      value = [...value];
      input!.focus();
      dispatch("change", value);
    }
  };

  const onRemove = (e: Event) => {
    const val = getNodeAttribute(e, "data-value");
    if (val) {
      e.stopPropagation();
      value = value.filter((v) => v !== val);
      dispatch("change", value);
    }
  };
</script>

<div class="responsive-ui-select--multiple {className}" bind:this={ref}>
  <div class="responsive-ui-select-input" on:click={() => (show = true)}>
    <input {name} type="hidden" value={value.join(",")} />
    <span class="responsive-ui-select__tags" on:click={onRemove}>
      {#each value as item}
        <span
          class="responsive-ui-select__tag"
          data-value={item}
          in:zoom
          out:zoom
        >
          <span>{dict.get(item).label}</span>
          <i class="responsive-ui-select__close" />
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
    style={`height:${show ? clientHeight : 0}px;max-height:${maxHeight}px;`}
  >
    <div bind:clientHeight style="padding:10px 0">
      {#each options as item, i}
        <div
          class="responsive-ui-select__option"
          class:responsive-ui-select__option--disabled={item.disabled}
          class:responsive-ui-select__option--selected={value.includes(
            item.value
          )}
          data-option={JSON.stringify([i, item])}
        >
          {item.label || ""}
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
      border: 1px solid rgba(241, 241, 241, 0.9);
      border-radius: var(--border-radius, 5px);
      min-height: var(--height, 34px);
      color: #1a1b1c;
      background: #f1f1f1;
      outline: none;
      box-sizing: border-box;
    }

    &__tags {
      display: inline-flex;
      width: 100%;
      padding: 4px 0 4px 10px;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      box-sizing: border-box;
    }

    &__tag {
      cursor: default;
      font-size: var(--font-size-sm, 12px);
      padding: 3px 8px;
      border-radius: var(--border-radius-sm, 3px);
      margin-right: 4px;
      margin-bottom: 4px;
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

      &:hover {
        background: #f5f5f5;
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
