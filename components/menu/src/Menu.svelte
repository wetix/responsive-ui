<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { getNodeAttribute } from "@wetix/utils";
  import type { MenuItem } from "../types";

  type MenuItemProp = {
    item: {
      key: string;
      label: string;
    };
    path: number[];
    hasSubmenu: boolean;
  };

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let ref: HTMLUListElement | null = null;
  export let items: MenuItem[] = [];
  export let path: number[] = [];

  const mutateMenu = (obj: MenuItem[], lvl: number[]) => {
    const currentpath = <number>lvl.shift();
    if (lvl.length < 1 && obj[currentpath]) {
      obj[currentpath].collapsed =
        obj[currentpath].collapsed === undefined ? false : !obj[currentpath].collapsed;
      return;
    }

    items.forEach((v, idx) => {
      if (idx === currentpath) {
        mutateMenu(<MenuItem[]>v.submenus, lvl);
      }
    });
  };

  const stringify = (item: MenuItem, index: number) => {
    const { submenus = [] } = item;
    return JSON.stringify({
      item: {
        ...item,
        submenus: undefined
      },
      path: [...path, index],
      hasSubmenu: submenus.length > 0
    });
  };

  const onSelect = (e: Event) => {
    const val = getNodeAttribute(e, "data-item");
    if (val) {
      const { path, hasSubmenu, item } = <MenuItemProp>JSON.parse(val);
      if (hasSubmenu) {
        mutateMenu(items, path.slice());
      }
      items = [...items];
      dispatch("change", { path, item });
    }
  };
</script>

<ul
  {...$$restProps}
  bind:this={ref}
  class={`responsive-ui-menu ${className}`}
  on:click={onSelect}
  transition:slide
>
  {#each items as item, i (item.key)}
    <li
      class="responsive-ui-menu__item"
      class:responsive-ui-menu__item--disabled={item.disabled}
      data-item={stringify(item, i)}
    >
      <div
        class="responsive-ui-menu__item"
        class:responsive-ui-menu--submenu={item.submenus}
        class:responsive-ui-menu--open={item.collapsed === false}
      >
        {#if item.icon}
          <svelte:component this={item.icon} />
        {/if}
        <div class="responsive-ui-menu__label">
          {item.label}
        </div>
      </div>
      {#if item.submenus && item.collapsed === false}
        <svelte:self
          class="responsive-ui-menu__submenu"
          path={[...path, i]}
          items={item.submenus}
        />
      {/if}
    </li>
  {/each}
</ul>

<style lang="scss">
  .responsive-ui-menu {
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style-type: none;
    list-style-position: inside;
    transition: all 0.5s;

    &__item {
      position: relative;
      cursor: pointer;
      display: block;
      margin: 2px 0;
      font-family: var(--font-family, inherit);
      font-size: var(--font-size, 14px);

      &--disabled {
        cursor: not-allowed !important;
        opacity: 0.65;
      }

      &:hover:not(&--disabled) > .responsive-ui-menu__label {
        background: #f5f5f5;
      }
    }

    &__label {
      position: relative;
      display: flex;
      color: #3b3b3b;
      padding: 6px 10px;
      flex-direction: row;
      align-items: center;
      text-decoration: none;
      transition: all 0.65s;

      .responsive-ui-menu__control {
        transition: all 0.5s;
        width: 20px;
        height: 20px;
        color: #999999;
        margin-left: auto;
      }

      &:not(&--collapsed) .responsive-ui-menu__control {
        transform: rotate(90deg);
      }
    }

    &--submenu {
      padding-right: 25px;
    }

    &--submenu:after {
      content: "";
      position: absolute;
      top: calc(50% - 5px);
      right: 10px;
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 10px solid #3b3b3b;
      transition: all 0.5s;
      // transform: rotate(90deg);
    }

    &--submenu.responsive-ui-menu--open:after {
      transform: rotate(90deg);
    }

    &__label {
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &.responsive-ui-menu__submenu {
      display: block;

      .responsive-ui-menu__item {
        padding-left: 10px;
      }
    }
  }
</style>
