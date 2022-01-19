<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
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
  export let ref: HTMLElement | null = null;
  export let options: MenuItem[] = [];
  export let path: number[] = [];

  const mutateMenu = (obj: MenuItem[], lvl: number[]) => {
    const currentpath = <number>lvl.shift();
    if (lvl.length < 1 && obj[currentpath]) {
      obj[currentpath].collapsed =
        obj[currentpath].collapsed === undefined ? false : !obj[currentpath].collapsed;
      return;
    }

    options.forEach((v, idx) => {
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

  const handleSelect = (e: Event) => {
    e.preventDefault();
    const el = e.composedPath().find((v) => v instanceof HTMLElement && v.dataset.item);
    if (!el) return;
    console.log(el);
    // const val = getNodeAttribute(e, "data-item");
    // if (val) {
    //   const { path, hasSubmenu, item } = <MenuItemProp>JSON.parse(val);
    //   if (hasSubmenu) {
    //     mutateMenu(options, path.slice());
    //   }
    //   options = [...options];
    //   dispatch("change", { path, item });
    // }
  };
</script>

<div
  {...$$restProps}
  class="resp-menu {className}"
  bind:this={ref}
  on:click={handleSelect}
  on:click
  transition:slide
>
  <ul>
    {#each options as item, i (item.key)}
      <li
        class="resp-menu__item"
        class:resp-menu__item--disabled={item.disabled}
        data-item={JSON.stringify(item)}
      >
        <slot name="menu-item">
          <div
            class="resp-menu__item"
            class:resp-menu--submenu={item.submenus}
            class:resp-menu--open={item.collapsed === false}
          >
            <div class="resp-menu__label">
              {item.label}
            </div>
          </div>
        </slot>
        {#if item.submenus && item.collapsed === false}
          <svelte:self
            class="resp-menu__submenu"
            path={[...path, i]}
            options={item.submenus}
          />
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style lang="scss" global>
  .resp-menu {
    display: block;
    background: #fff;
    padding: 0.5rem;
    border-radius: var(--border-radius, 10px);
    box-shadow: 0 0 26px rgba(0, 0, 0, 0.3);

    & > ul {
      list-style-type: none;
      list-style-position: inside;
      padding: 0;
      margin: 0;
    }

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

      &:hover:not(&--disabled) > .resp-menu__label {
        background: #fc4451;
        border-radius: 6px;
      }
    }

    &__label {
      position: relative;
      display: flex;
      color: #3b3b3b;
      padding: 6px 10px;
      flex-direction: row;
      align-options: center;
      text-decoration: none;
      transition: all 0.65s;

      .resp-menu__control {
        transition: all 0.5s;
        width: 20px;
        height: 20px;
        color: #999999;
        margin-left: auto;
      }

      &:not(&--collapsed) .resp-menu__control {
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

    &--submenu.resp-menu--open:after {
      transform: rotate(90deg);
    }

    &__label {
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &.resp-menu__submenu {
      display: block;

      .resp-menu__item {
        padding-left: 10px;
      }
    }
  }
</style>
