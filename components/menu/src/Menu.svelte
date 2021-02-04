<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { getNodeAttribute } from "@wetix/utils";

  import type { MenuItem } from "../types";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let items: MenuItem[] = [];
  export let level: number[] = [];

  const deepMap = (
    obj: MenuItem[]
  ): (MenuItem & {
    isActive: boolean;
    collapsed?: boolean;
  })[] =>
    obj.map((v) => {
      if (v.submenus) {
        return Object.assign(v, {
          isActive: false,
          collapsed: false,
          submenus: deepMap(v.submenus),
        });
      }
      return Object.assign(v, {
        isActive: false,
      });
    });

  let _items = deepMap(items);

  const mutateMenu = (obj: Record<any, any>, lvl: number[]) => {
    const currentLevel = <number>lvl.shift();
    if (lvl.length < 1 && obj[currentLevel]) {
      obj[currentLevel].collapsed = !obj[currentLevel].collapsed;
      _items = _items;
      return;
    }
    _items.forEach((v, idx) => {
      if (idx === currentLevel) {
        mutateMenu(<MenuItem[]>v.submenus, lvl);
      }
    });
  };

  const onSelect = (e: Event) => {
    const value = getNodeAttribute(e, "data-value");
    if (value) {
      const js = JSON.parse(value);
      console.log(js);
      console.log(value);
      // mutateMenu(_items, item);
    }
    // const collapsable = JSON.parse(getNodeAttribute(e, "data-collapsable"));
    // const item = <null | number[]>JSON.parse(getNodeAttribute(e, "data-item"));
    // if (collapsable) {
    // }
    // if (value) {
    //   dispatch("click", { value, event: e });
    // }
  };
</script>

<ul
  class={`responsive-ui-menu ${className}`}
  on:click={onSelect}
  transition:slide
>
  {#each _items as item, i (item.value)}
    <li
      class="responsive-ui-menu__item"
      class:responsive-ui-menu__item--disabled={item.disabled}
      class:responsive-ui-menu__item--collapsed={!item.collapsed}
      class:responsive-ui-menu__item--active={item.isActive}
      data-value={JSON.stringify(item.value)}
      data-item={JSON.stringify([i, ...level])}
      data-collapsable={JSON.stringify(!!item.submenus)}
    >
      <div class="responsive-ui-menu__title">
        <div class="responsive-ui-menu__label">{item.title}</div>
        {#if item.submenus}
          <!-- <span class="menu-control"> &#8595; </span> -->
          <svg class="responsive-ui-menu__control" viewBox="0 0 20 20">
            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
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
      line-height: 2;

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
      background-color: #f3f3f3;

      .responsive-ui-menu__item {
        padding-left: 15px;
      }
    }
  }
</style>
