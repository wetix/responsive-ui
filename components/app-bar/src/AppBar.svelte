<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { fade } from "svelte/transition";
  import Scroll from "@responsive-ui/hscroll";
  import type { NavItem, SubNavItem } from "../types";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let selectedKey = "";
  export let selectedSubmenuKey = "";
  export let clientHeight = 0;
  export let shadowed = true;
  export let leadingItems: NavItem[] = [];
  export let trailingItems: NavItem[] = [];

  let openMenu = false;
  let subnav: HTMLElement;
  let selectedIndex = 0;
  let subMenus: SubNavItem[] = [];
  let subnavStyle = "";
  $: selectedIndex = leadingItems.findIndex((v) => v.key === selectedKey);

  // for selecting submenu
  $: {
    const menus = (leadingItems[selectedIndex] || {}).subItems || [];
    if (menus.length > 0 && selectedSubmenuKey === "")
      selectedSubmenuKey = menus[0].key as string;
    subMenus = menus;
  }

  $: if (subnav) {
    const el = subnav.querySelector(`[data-key="${selectedSubmenuKey}"]`);
    if (el) {
      const rect = el.getBoundingClientRect();
      subnavStyle = `left: ${rect.left}px; width: ${rect.width}px; max-width: ${rect.width}px;`;
    }
  }

  const handleMenu = (e: Event) => {
    // if the element is underneath an anchor link, we will close the side menu
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    setTimeout(() => {
      openMenu = false;
    }, 150);
  };

  const findElement = (e: Event) => {
    return e
      .composedPath()
      .find((v) => v instanceof HTMLElement && v.dataset.key) as HTMLElement;
  };

  const handleClickLeading = (e: Event) => {
    const el = findElement(e);
    if (!el) return;
    selectedKey = el.dataset.key as string;
    dispatch("menuchange", { selectedKey, selectedSubmenuKey });
  };

  const handleClickSubmenu = (e: Event) => {
    const el = findElement(e);
    if (!el) return;
    selectedSubmenuKey = el.dataset.key as string;
    dispatch("menuchange", { selectedKey, selectedSubmenuKey });
  };
</script>

<header
  class="resp-app-bar {className}"
  class:resp-app-bar--shadowed={shadowed}
  bind:clientHeight
  on:click
  {...$$restProps}
>
  <div class="resp-app-bar__box">
    <div class="resp-app-bar__main">
      <div class="resp-app-bar__icon-menu" on:click={() => (openMenu = !openMenu)}>
        {@html `<svg width="24" height="24" viewBox="0 0 24 24" role="img"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" /></svg>`}
      </div>
      <div class="resp-app-bar__logo">
        <slot name="logo" />
      </div>
      <div class="resp-app-bar__leading">
        <slot name="leading" items={leadingItems}>
          <ul on:click={handleClickLeading}>
            {#each leadingItems as { key, href, label, ...otherProps }, index (key)}
              <li
                class:resp-app-bar__leading-item--selected={selectedKey === key}
                data-key={key}
              >
                <slot name="leading-item" item={leadingItems[index]} {index}>
                  {#if href}
                    <a {href} {...otherProps}>{label}</a>
                  {:else}
                    {label}
                  {/if}
                </slot>
              </li>
            {/each}
          </ul>
        </slot>
      </div>
      <div class="resp-app-bar__trailing">
        <slot name="trailing" items={trailingItems}>
          <ul>
            {#each trailingItems as { href, label, selected, ...otherProps }, index}
              <li class:resp-app-bar__subnav-item--selected={selected}>
                <slot name="trailing-item" item={trailingItems[index]} {index} {selected}>
                  <a {href} {...otherProps}>{label}</a>
                </slot>
              </li>
            {/each}
          </ul>
        </slot>
      </div>
    </div>
  </div>

  <!-- subnav -->
  {#if subMenus.length > 0}
    <nav class="resp-app-bar__subnav" bind:this={subnav} on:click={handleClickSubmenu}>
      <Scroll>
        <ul>
          {#each subMenus as { key, href, label, ...otherProps }}
            {@const selected = selectedSubmenuKey === key}
            <li
              class="resp-app-bar__subnav-item"
              class:resp-app-bar__subnav-item--selected={selected}
              data-key={key}
            >
              <a {href} {...otherProps}>
                {label}
              </a>
              {#if selected}
                <span class="resp-app-bar__subnav-indicator" in:slide out:slide />
              {/if}
            </li>
          {/each}
        </ul>
      </Scroll>
    </nav>
  {/if}
</header>

{#if openMenu}
  <div
    class="resp-app-bar__overlay"
    in:fade
    out:fade
    on:click={() => (openMenu = false)}
  />
{/if}
<!-- menu items should be the same as leading items -->
<aside
  class="resp-app-bar__menu"
  class:resp-app-bar__menu--close={!openMenu}
  on:click={handleMenu}
>
  <header class="resp-app-bar__menu-header">
    <slot name="logo" />
    <i class="resp-app-bar__menu-icon" on:click={() => (openMenu = false)}>
      {@html `<svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" /></svg>`}
    </i>
  </header>
  <div class="resp-app-bar__menu-body">
    <slot name="menu-body">
      <ul on:click={handleClickLeading}>
        {#each leadingItems as { key, href, label, selected, ...otherProps }, index (key)}
          <li
            class:resp-app-bar__menu-item--selected={selectedKey === key}
            data-key={key}
          >
            <slot name="menu-item" item={leadingItems[index]} {index} {selected}>
              <a style="display: flex; width: 100%;" {href} {...otherProps}>
                <span style="display: inline-block; width: 50%;">{label}</span>
                <!-- circle icon -->
                <span class="resp-app-bar__menu-item-icon">
                  {@html `<svg height="8px" width="6px"><circle cx="3" cy="3" r="3" fill="#fc4451" /></svg>`}
                </span>
              </a>
            </slot>
          </li>
        {/each}
      </ul>
    </slot>
  </div>
  <div class="resp-app-bar__menu-footer">
    <div>
      <slot name="footer" />
    </div>
  </div>
</aside>

<style lang="scss" global>
  $sm: 576px;
  $md: 768px;
  $height: 55px;

  .resp-app-bar {
    position: fixed;
    display: inline-flex;
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    background-color: inherit;
    height: auto;
    z-index: 100;

    &__icon-menu {
      cursor: pointer;
      display: inline-flex;

      @media (min-width: $sm) {
        display: none;
      }
    }

    ul {
      list-style: none;
      list-style-position: inside;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
      align-items: center;

      li {
        cursor: pointer;
        padding: 0 0.5rem;
        white-space: nowrap;
      }
    }

    &__box {
      position: relative;
      height: $height;
      width: 100%;
      background: #fff;
      z-index: 500;
    }

    &__main {
      width: 100%;
      height: 100%;
      padding: 0 1rem;
      margin: 0 auto;
      align-items: center;
      display: flex;
      justify-content: space-between;

      @media (min-width: $md) {
        width: 80%;
      }
    }

    &__leading {
      flex-grow: 1;
      min-width: 0;
      display: none;
      overflow: hidden;
      transition: all 0.5s;

      &-item {
        &--selected {
          color: #fc4451;
        }
      }

      @media (min-width: $sm) {
        display: initial;
      }
    }

    &__trailing {
      ul {
        justify-content: flex-end;
      }
    }

    &__subnav {
      background-color: #fc4451;
      color: #fff;
      z-index: 450;

      // &-item--selected {
      //   font-weight: 600;
      // }

      ul {
        position: relative;
        height: 42px;

        li {
          padding: 0 1rem;
          transition: all 0.5s;

          a {
            display: flex;
            align-items: center;
            height: 100%;
          }
        }
      }

      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 100%;
      }

      &-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0 !important;
        margin: 0;
        height: 2px;
        width: 100%;
        background: #fff;
      }
    }

    &--shadowed {
      .resp-app-bar__box,
      .resp-app-bar__subnav {
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
      }
    }

    &__menu,
    &__overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
    }

    &__overlay {
      right: 0;
      background: rgba(0, 0, 0, 0.65);
    }

    &__menu {
      background: #fff;
      width: 70%;
      min-width: 250px;
      transform: translateX(0%);
      transition: all 0.5s;

      &--close {
        transform: translateX(-110%);
      }

      &-header {
        display: flex;
        padding: 0 1rem;
        height: $height;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f5f5f5;

        caption {
          text-align: left;
          font-size: var(--font-size-lg, 24px);
          font-weight: 600;
          flex-grow: 1;
          min-width: 0;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-right: 0.25rem;
          overflow: hidden;
        }
      }

      &-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
      }

      &-footer > div {
        padding: 1rem;
      }

      &-icon {
        display: inline-flex;
        cursor: pointer;
      }

      &-body {
        overflow-y: auto;
      }

      &-item {
        &--selected {
          color: #fc4451;
        }

        &-icon {
          display: none;
          width: 50%;
          text-align: right;
        }

        &--selected > a > &-icon {
          display: inline-block;
        }
      }

      ul {
        margin: 0;
        padding: 1rem;
        list-style-type: none;
        list-style-position: inside;

        li {
          padding: 0.5rem 0;
        }
      }
    }
  }

  .resp-app-bar,
  .resp-app-bar__subnav,
  .resp-app-bar__menu {
    a {
      cursor: pointer;
      color: inherit;
      text-decoration: none;
      display: block;
    }
  }
</style>
