<script lang="ts">
  import { fade } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import Scroll from "@responsive-ui/hscroll";
  import type { NavItem } from "../types";

  const tween = tweened(1, {
    duration: 150,
  });

  export let menuCaption = "";
  export let clientHeight = 0;
  export let shadowed = true;
  export let leadingItems: NavItem[] = [];
  export let trailingItems: NavItem[] = [];

  let openMenu = false;

  $: if (openMenu) {
    tween.set(0);
  } else {
    tween.set(1);
  }
</script>

<header
  class="resp-app-bar"
  class:resp-app-bar--shadowed={shadowed}
  bind:clientHeight
  on:click
  {...$$restProps}
>
  <div class="resp-app-bar__box">
    <div class="resp-app-bar__main">
      <div
        class="resp-app-bar__icon-menu"
        on:click={() => (openMenu = !openMenu)}
      >
        {@html `<svg width="24" height="24" viewBox="0 0 24 24" role="img"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" /></svg>`}
      </div>
      <div class="resp-app-bar__logo">
        <slot name="logo" />
      </div>
      <div class="resp-app-bar__leading">
        <slot name="leading" items={leadingItems}>
          <ul>
            {#each leadingItems as { href, label, selected, ...otherProps }, index}
              <li class:resp-app-bar__subnav-item--selected={selected}>
                <slot
                  name="leading-item"
                  item={leadingItems[index]}
                  {index}
                  {selected}
                >
                  <a {href} {...otherProps}>{label}</a>
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
                <slot
                  name="trailing-item"
                  item={trailingItems[index]}
                  {index}
                  {selected}
                >
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
  {#if leadingItems.length > 0}
    <nav class="resp-app-bar__subnav">
      <Scroll>
        <ul>
          {#each leadingItems[0].subItems as { href, label, selected, ...otherProps }}
            <li class:resp-app-bar__subnav-item--selected={selected}>
              <a {href} {...otherProps}>{label}</a>
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
  <aside
    class="resp-app-bar__menu"
    style={`transform: translateX(-${$tween * 100}%);`}
  >
    <header class="resp-app-bar__menu-header">
      <caption>{menuCaption}</caption>
      <i class="resp-app-bar__menu-icon" on:click={() => (openMenu = false)}>
        {@html `<svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" /></svg>`}
      </i>
    </header>
    <div class="resp-app-bar__menu-body">
      <ul>
        {#each leadingItems as { href, label, selected, ...otherProps }, index}
          <li>
            <slot
              name="leading-item"
              item={leadingItems[index]}
              {index}
              {selected}
            >
              <a {href} {...otherProps}>{label}</a>
            </slot>
          </li>
        {/each}
      </ul>
    </div>
  </aside>
{/if}

<style lang="scss" global>
  $sm: 576px;
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
        padding: 0 5px;
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

      @media (min-width: $sm) {
        width: 80%;
      }
    }

    &__leading {
      flex-grow: 1;
      min-width: 0;
      display: none;
      overflow: hidden;

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

      &-item--selected {
        font-weight: 600;
      }

      ul {
        height: 42px;

        li {
          padding: 0 1.5rem;
        }
      }

      a {
        text-decoration: none;
        color: inherit;
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
      width: 90%;

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

      &-icon {
        display: inline-flex;
        cursor: pointer;
      }

      &-body {
        height: calc(100% - $height);
        overflow-y: auto;
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
</style>
