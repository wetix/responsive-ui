<script lang="ts">
  import Scroll from "@responsive-ui/hscroll";
  import type { NavItem } from "../types";

  export let mode = "sticky";
  export let shadowed = true;
  export let leadingItems: NavItem[] = [];
  export let trailingItems: NavItem[] = [];
</script>

<header class="resp-app-bar" class:resp-app-bar--shadowed={shadowed} on:click>
  <div class="resp-app-bar__box">
    <div class="resp-app-bar__main">
      <div class="resp-app-bar__logo"><slot name="logo" /></div>
      <div class="resp-app-bar__leading">
        <slot name="center">
          <ul>
            {#each leadingItems as { link, label, selected, ...otherProps }, index}
              <li class:resp-app-bar__subnav-item--selected={selected}>
                <slot
                  name="leading-item"
                  item={leadingItems[index]}
                  {index}
                  {selected}
                >
                  <a href={link} {...otherProps}>{label}</a>
                </slot>
              </li>
            {/each}
          </ul>
        </slot>
      </div>
      <div class="resp-app-bar__trailing">
        <slot name="trailing">
          <ul>
            {#each trailingItems as { link, label, selected, ...otherProps }, index}
              <li class:resp-app-bar__subnav-item--selected={selected}>
                <slot
                  name="trailing-item"
                  item={trailingItems[index]}
                  {index}
                  {selected}
                >
                  <a href={link} {...otherProps}>{label}</a>
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
          {#each leadingItems[0].subItems as { link, label, selected, ...otherProps }}
            <li class:resp-app-bar__subnav-item--selected={selected}>
              <a href={link} {...otherProps}>{label}</a>
            </li>
          {/each}
        </ul>
      </Scroll>
    </nav>
  {/if}
</header>

<style lang="scss" global>
  $sm: 576px;
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
      height: 50px;
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
  }
</style>
