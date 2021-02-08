<script lang="ts">
  import { tick } from "svelte";

  import type { DropdownItem, DropdownTriggerMode } from "../types";

  let className = "";
  export { className as class };
  export let ref: null | HTMLDivElement = null;
  export let items: DropdownItem[] = [];
  export let value: string[] = [];
  export let trigger: DropdownTriggerMode = "click";
  export let size = 5;

  let x = 0;
  let y = 0;
  // ((inner padding + (font-size * line height)) * maxDisplayItem) + outer padding
  const maxHeight = size <= 0 ? "100%" : `${(10 + 14 * 1.5) * size + 20}px`;
  let show = false;
  let clientHeight: number;
  let menuList: HTMLDivElement;

  $: {
    if (menuList) {
      const rect = menuList.getBoundingClientRect();
      x = Math.min(window.innerWidth - rect.width, x);
      if (y > window.innerHeight - rect.height) y -= clientHeight;
    }
  }

  const eventHandler = () => {
    show = !show;
  };

  const onContextMenu = async (e: MouseEvent) => {
    if (show) {
      show = false;
      await tick();
    }
    x = e.clientX;
    y = e.clientY;
    show = true;
  };

  const onClickOutside = () => {
    if (trigger === "contextmenu") {
      show = false;
    }
  };
</script>

<div
  {...$$restProps}
  bind:this={ref}
  class="responsive-ui-dropdown {className}"
  on:click={onClickOutside}
  on:mouseenter={trigger === "hover"
    ? () => {
        show = true;
      }
    : undefined}
  on:mouseleave={trigger === "hover"
    ? () => {
        show = false;
      }
    : undefined}
>
  <div
    class="responsive-ui-dropdown__activator"
    on:click={trigger === "click" ? eventHandler : undefined}
    on:contextmenu|preventDefault={trigger === "contextmenu"
      ? onContextMenu
      : undefined}
  >
    <slot />
  </div>
  <div
    class="responsive-ui-dropdown__list"
    class:responsive-ui-dropdown__contextmenu={trigger === "contextmenu"}
    on:click={() => {
      show = !show;
    }}
    style={`height:${show ? clientHeight : 0}px; max-height: ${maxHeight};${
      trigger === "contextmenu" ? `top:${y}px;left:${x}px;` : ""
    }`}
    bind:this={menuList}
  >
    <div bind:clientHeight style="padding:10px 0">
      {#each items as item, i}
        {#if item.divider}
          <hr class="responsive-ui-dropdown__divider" />
        {:else if item.href}
          <a
            class="responsive-ui-dropdown__item"
            class:responsive-ui-dropdown__item--disabled={item.disabled}
            href={item.href}
          >
            {item.label || ""}
          </a>
        {:else}
          <div
            class="responsive-ui-dropdown__item"
            class:responsive-ui-dropdown__item--disabled={item.disabled}
            on:click={item.onClick ? item.onClick : () => {}}
          >
            {item.label || ""}
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .responsive-ui-dropdown {
    position: relative;

    &__list {
      min-width: 100px;
      background: #fff;
      margin: 0;
      padding: 0;
      user-select: none;
      overflow-x: hidden;
      overflow-y: auto;
      transition: all 0.3s;
      border-radius: var(--border-radius, 5px);
      box-shadow: 0 0 26px rgba(0, 0, 0, 0.15);
      z-index: 10;

      &:not(.responsive-ui-dropdown__contextmenu) {
        position: absolute;
        top: 120%;
        left: 0;
      }

      &.responsive-ui-dropdown__contextmenu {
        position: fixed;
      }
    }

    &__item {
      cursor: pointer;
      position: relative;
      white-space: nowrap;
      font-size: var(--font-size, 14px);
      transition: all 0.3s;
      transition-property: background, color;
      padding: 5px 10px;
      margin-bottom: 1px;
      display: block;
      text-decoration: none;
      color: #000;

      &:hover {
        background: #f5f5f5;
      }

      &--disabled {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    &__divider {
      border-top: 1px solid #0003;
      width: 100%;
      margin: 2px 0;
    }
  }
</style>
