<script lang="ts">
  import { slide } from "svelte/transition";
  import { getNodeAttribute } from "@wetix/utils";
  import type { MenuItems } from "../types";

  let className = "";
  export { className as class };

  export let items: MenuItems[] = [];
  export let level = [];
  export let onSelectMenu = (_) => {};

  const handleSelectMenu = (e: Event) => {
    const data = JSON.parse(getNodeAttribute(e, "data-item"));
    onSelectMenu(data);
  };
</script>

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

<ul
    class={`responsive-ui-menu ${className}`}
    on:click={handleSelectMenu}
    transition:slide>
  {#each items as item, i}
    <li
        class="responsive-ui-menu__item"
        class:responsive-ui-menu__item--disabled={item.disabled}
        class:responsive-ui-menu__item--collapsed={!item.collapsed}
        class:responsive-ui-menu__item--active={item.isActive}
        data-item={JSON.stringify([...level, i])}>
      {#if item.disabled}
        <div class="responsive-ui-menu__title">
          <div class="responsive-ui-menu__label">{item.title}</div>
        </div>
      {:else}
        <a href={item.href} class="responsive-ui-menu__title">
          <div class="responsive-ui-menu__label">{item.title}</div>
          {#if level.length === 0 && item.submenus}
            <!-- <span class="menu-control"> &#8595; </span> -->
            <svg class="responsive-ui-menu__control" viewBox="0 0 20 20">
              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
            </svg>
          {/if}
        </a>
      {/if}
      {#if item.submenus && item.collapsed}
        <svelte:self
            class="responsive-ui-menu__submenu"
            level={[...level, i]}
            items={item.submenus} />
      {/if}
    </li>
  {/each}
</ul>
