<script lang="ts">
  import { getNodeAttribute } from "@wetix/utils";
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import type { MenuItems } from "../types";

  let className = "";
  const dispatch = createEventDispatcher();
  export { className as class };

  export let items: MenuItems[] = [];
  export let level: number[] = [];

  let _items: (MenuItems & {
    isActive: boolean; collapsed: boolean
  })[] = items.map((v) => Object.assign(v, {
    isActive: false,
    collapsed: true,
  }))

  const mutateMenu = (obj: Record<any, any>, lvl: number[]) => {
    const currentLevel = lvl.shift()
    if (lvl.length < 1 && obj[currentLevel]) {
      obj[currentLevel].collapsed = !obj[currentLevel].collapsed
      _items = _items
      return;
    }
    _items.forEach((v, idx) => {
      if (idx === currentLevel) {
        mutateMenu(v.submenus, lvl)
      }
    })
  }

  const handleSelectMenu = (e: Event) => {
    const value = JSON.parse(getNodeAttribute(e, "data-value"));
    const collapsable = JSON.parse(getNodeAttribute(e, "data-collapsable"))
    const item = <null | number[]>JSON.parse(getNodeAttribute(e, "data-item"))
    if (collapsable) {
      mutateMenu(_items, item)
    }
    if (value) {
      dispatch("click", {value, event: e});
    }
  };
</script>

<ul
    class={`responsive-ui-menu ${className}`}
    on:click={handleSelectMenu}
    transition:slide
>
  {#each _items as item, i (item.value)}
    <li
        class="responsive-ui-menu__item"
        class:responsive-ui-menu__item--disabled={item.disabled}
        class:responsive-ui-menu__item--collapsed={!item.collapsed}
        class:responsive-ui-menu__item--active={item.isActive}
        data-value="{JSON.stringify(item.value)}"
        data-item={JSON.stringify([i, ...level])}
        data-collapsable="{JSON.stringify(!!item.submenus)}"
    >
      <div class="responsive-ui-menu__title">
        <div class="responsive-ui-menu__label">{item.title}</div>
        {#if item.submenus}
          <!-- <span class="menu-control"> &#8595; </span> -->
          <svg class="responsive-ui-menu__control" viewBox="0 0 20 20">
            <path d="M6 6L14 10L6 14V6Z" fill="currentColor"/>
          </svg>
        {/if}
      </div>
      {#if item.submenus && item.collapsed}
        <svelte:self
            class="responsive-ui-menu__submenu"
            level={[...level, i]}
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
    transition: all 0.5s;
    list-style-type: none;
    list-style-position: inside;

    &__item {
      position: relative;
      border-radius: 6px;
      cursor: pointer;
      display: block;
      padding: 4px;
      transition: all 0.5s;
      /* Required for text-overflow to do anything */
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-top: 4px;

      .responsive-ui-menu__control {
        transition: all 0.5s;
        width: 20px;
        height: 20px;
        color: #999999;
        margin-left: auto;
      }

      &:not(&--collapsed) {
        .responsive-ui-menu__control {
          transform: rotate(90deg);
        }
      }

      &--disabled {
        cursor: not-allowed !important;
        opacity: 0.8;
      }

      &--active {
        background-color: #e5e7eb;
      }

      &:hover:not(&--disabled) > .responsive-ui-menu__title {
        color: var(--primary-color, #fc4451);
      }
    }

    &__title {
      position: relative;
      display: flex;
      color: #3b3b3b;
      flex-direction: row;
      align-items: center;
      text-decoration: none;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      transition: all 0.65s;

      // .menu-label {
      //   flex-grow: 1;
      //   text-align: left;
      //   white-space: nowrap;
      //   text-overflow: ellipsis;
      //   padding: 0 10px;
      // }

      // .icon {
      //   position: absolute;
      //   right: 10px;
      //   display: inline-block;
      //   transition: all 0.3s;

      //   svg {
      //     fill: #000;
      //   }
      // }
    }

    &.responsive-ui-menu__submenu {
      display: block;

      .responsive-ui-menu__item {
        padding-left: 36px;
      }
    }
  }
</style>
