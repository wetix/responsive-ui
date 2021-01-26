<script lang="ts">
  import type { DropdownItem, DropdownTriggerMode } from "../types";

  let className = "";
  export { className as class };
  export let items: DropdownItem[] = [];
  export let size = 10;
  export let value: string[] = [];
  export let disabled = false;
  export let trigger: DropdownTriggerMode = "click";

  const maxHeight = 25 + size * 20;
  let input: null | HTMLInputElement;
  let show = false;
  let clientHeight;

  const eventHandler = () => {
    show = !show;
  };
</script>

<div class="responsive-ui-dropdown {className}">
  <div
    class="responsive-ui-dropdown__activator"
    on:click={trigger === "click" ? eventHandler : undefined}
    on:contextmenu|preventDefault={trigger === "context" ? eventHandler : undefined}
    on:hover={trigger === "hover" ? eventHandler : undefined}
  >
    <slot />
  </div>
  <div
    class="responsive-ui-dropdown__list"
    on:click={() => {show = !show}}
    style={`height:${show ? clientHeight : 0}px; max-height: ${maxHeight}px;`}
  >
    <div bind:clientHeight style="padding:10px 0">
      {#each items as item, i}
        {#if item.href}
          <a
            class="responsive-ui-dropdown__item"
            class:responsive-ui-dropdown__item--disabled={item.disabled}
            href={item.href}
          >
            {item.title || ""}
          </a>
        {:else}
          <div
            class="responsive-ui-dropdown__item"
            class:responsive-ui-dropdown__item--disabled={item.disabled}
            on:click={item.onClick ? item.onClick : () => {}}
          >
            {item.title || ""}
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

    &__item {
      cursor: pointer;
      position: relative;
      white-space: nowrap;
      font-size: var(--font-size, 14px);
      transition: all 0.3s;
      transition-property: background, color;
      padding: 3px 10px;
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
  }
</style>
