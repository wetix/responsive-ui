<script lang="ts">
  import { slide } from "svelte/transition";
  import Scroll from "@responsive-ui/hscroll";
  import Icon from "@responsive-ui/icon";
  import type { NavItem, SubNavItem } from "../types";

  let className = "";
  export { className as class };
  export let clientHeight = 0;
  export let shadowed = true;
  export let leadingItems: NavItem[] = [];
  export let trailingItems: NavItem[] = [];
  export let currentPath: string = "/";

  let openSideMenu = false;
  let subMenus: SubNavItem[] = [];

  const handleClickSideMenu = (e: Event) => {
    if ((e.target as HTMLElement).tagName == "A") {
      openSideMenu = false;
    }
  };

  const isActivePath = (path: string, matchEnd: boolean = false) => {
    path += `(\\?.*)?`;
    if (matchEnd) path += "$";
    const pattern = new RegExp(path, "gi");
    return pattern.test(currentPath);
  };

  $: if (currentPath) {
    subMenus = [];
    const idx = leadingItems.findIndex((v) => isActivePath(v.href || ""));
    if (idx >= 0) {
      subMenus = leadingItems[idx].subItems || [];
    }

    // trigger re-render
    currentPath = currentPath;
  }
</script>

<header
  class={`resp-app-bar ${className}`}
  class:resp-app-bar--shadowed={shadowed}
  bind:clientHeight
  on:click
  {...$$restProps}
>
  <div class="resp-app-bar__box">
    <div class="resp-app-bar__main">
      <div
        class="resp-app-bar__icon-menu"
        on:click={() => (openSideMenu = !openSideMenu)}
      >
        {@html `<svg width="24" height="24" viewBox="0 0 24 24" role="img"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" /></svg>`}
      </div>
      <div class="resp-app-bar__logo">
        <slot name="logo" />
      </div>
      <div class="resp-app-bar__leading">
        <slot name="leading" items={leadingItems}>
          <ul>
            {#each leadingItems as { href, label, subItems, ...otherProps }}
              <li class="resp-app-bar__leading-item">
                <a
                  {href}
                  {...otherProps}
                  class:resp-app-bar__leading-item--selected={isActivePath(href || "")}
                >
                  {label}
                </a>
              </li>
            {/each}
          </ul>
        </slot>
      </div>
      <div class="resp-app-bar__trailing">
        <slot name="trailing" items={trailingItems}>
          <ul>
            {#each trailingItems as { href, label, ...otherProps }, index}
              <li>
                <slot name="trailing-item" item={trailingItems[index]}>
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
    <nav class="resp-app-bar__subnav">
      <Scroll>
        <ul>
          {#each subMenus as { key, href, label, ...otherProps }}
            <li
              class="resp-app-bar__subnav-item"
              class:resp-app-bar__subnav-item--selected={isActivePath(href || "", true)}
            >
              <a {href} {...otherProps}>
                <span>{label}</span>
              </a>
              {#if isActivePath(href || "", true)}
                <span class="resp-app-bar__subnav-indicator" transition:slide />
              {/if}
            </li>
          {/each}
        </ul>
      </Scroll>
    </nav>
  {/if}
</header>

{#if openSideMenu}
  <div class="resp-app-bar__overlay" on:click={() => (openSideMenu = false)} />
{/if}
<!-- SIDE MENU -->
<aside
  on:click={handleClickSideMenu}
  class="resp-app-bar__sidemenu"
  class:resp-app-bar__sidemenu--close={!openSideMenu}
>
  <header class="resp-app-bar__sidemenu-header">
    <slot name="logo" />
    <i class="resp-app-bar__sidemenu-icon" on:click={() => (openSideMenu = false)}>
      {@html `<svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" /></svg>`}
    </i>
  </header>
  <div class="resp-app-bar__sidemenu-body">
    <slot name="menu-body">
      <ul>
        {#each leadingItems as { key, href, label, icon, ...otherProps }, index (key)}
          <!-- menu leading items -->
          <li class="resp-app-bar__sidemenu-item">
            <slot name="menu-item" item={leadingItems[index]}>
              <input type="checkbox" id="check_{key}" checked />
              <label for="check_{key}">
                {#if (otherProps.subItems || []).length > 0}
                  <div class="resp-app-bar__sidemenu-item__dropdown">
                    <span style="width: 100%;" class="item-label">
                      <Icon useHref={icon} style="width: 16px; height: 16px;" />
                      <span>{label}</span>
                    </span>
                    <svg
                      class="drop-icon"
                      style="width: 20px; height: 20px;"
                      viewBox="-14 -25 70 70"
                    >
                      <defs />
                      <g>
                        <path
                          d="M 2 2 L 22 22 L 42 2"
                          fill="none"
                          stroke="#fc4451"
                          stroke-width="5"
                          stroke-miterlimit="10"
                          pointer-events="stroke"
                        />
                      </g>
                    </svg>
                  </div>
                {:else}
                  <a
                    class:resp-app-bar__sidemenu-item--selected={isActivePath(href || "")}
                    {href}
                    {...otherProps}
                  >
                    <span class="item-label" style="height: 100%;">
                      <Icon useHref={icon} style="width: 16px; height: 16px;" />
                      <span>{label}</span>
                    </span>
                  </a>
                {/if}
              </label>
            </slot>
            {#if (otherProps.subItems || []).length > 0}
              <!-- menu subnav items -->
              <div class="resp-app-bar__sidemenu-sub">
                <ul>
                  {#each otherProps.subItems || [] as sub, subIndex}
                    <li class="resp-app-bar__sidemenu-sub__item">
                      <slot
                        name="menu-subitem"
                        item={leadingItems[index].subMenus[subIndex]}
                      >
                        <a
                          class:resp-app-bar__sidemenu-sub__item__selected={isActivePath(
                            sub.href || "",
                            true
                          )}
                          href={sub.href}
                          {...otherProps}
                        >
                          {sub.label}
                        </a>
                      </slot>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    </slot>
  </div>
  <div class="resp-app-bar__sidemenu-footer">
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

    @media (max-width: $sm) {
      &__logo {
        width: 100%;
        text-align: left;
        margin: 1rem;
        div {
          width: max-content;
        }
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
        white-space: nowrap;
        margin: 0 var(--margin, 1rem);
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
      z-index: 450;

      ul {
        position: relative;
        height: 42px;

        li {
          transition: all 0.5s;
          margin: 0;

          a {
            display: flex;
            align-items: center;
            height: 100%;
            width: 100%;

            span {
              color: #fff;
              margin: 0 1rem;
            }
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

    &__sidemenu,
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

    &__sidemenu {
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
      }

      &-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #f5f5f5;
      }

      &-icon {
        display: inline-flex;
        cursor: pointer;
      }

      &-body {
        overflow-y: auto;

        ul {
          margin: 0;
          list-style-type: none;
          list-style-position: inside;
          padding: unset;
          li {
            padding: 0;
            a {
              padding: 0.5rem 1rem;
            }
          }
        }
      }

      &-sub {
        height: 0;
        overflow: hidden;

        &__item {
          a {
            padding: 0.5rem 1rem 0.5rem 3rem !important;
          }

          &__selected {
            background-color: #f5f5f5;
            border-right: 4px solid #fc4451;
            color: #fc4451;
          }
        }
      }

      &-item {
        &--selected {
          background-color: #f5f5f5;
          border-right: 4px solid #fc4451;
          .item-label {
            color: #fc4451;
          }
        }

        .item-label {
          align-items: center;
          span {
            padding-left: 5px;
            vertical-align: middle;
          }
        }

        &__dropdown {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
        }

        label > div > .drop-icon {
          transform: rotateZ(-90deg);
          transition: transform 0.5s ease;
        }

        input[type="checkbox"] {
          display: none;
        }

        input[type="checkbox"]:checked ~ .resp-app-bar__sidemenu-sub {
          height: auto;
        }

        input[type="checkbox"]:checked ~ label > div > .drop-icon {
          transform: unset;
        }
      }
    }
  }

  .resp-app-bar,
  .resp-app-bar__subnav,
  .resp-app-bar__sidemenu {
    a {
      cursor: pointer;
      text-decoration: none;
      display: block;
    }
  }
</style>
