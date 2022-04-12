<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import type { MenuOption } from "../types";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let open = false;
  export let ref: HTMLElement;
  export let options: MenuOption[] = [];
  export let align: "left" | "right" | "center" = "right";
  export const path: number[] = [];

  // const handleSelect = (e: Event) => {
  //   e.stopPropagation();
  //   const el = e
  //     .composedPath()
  //     .find((v) => v instanceof HTMLElement && v.dataset.option) as HTMLElement;
  //   if (!el) return;
  //   const option = JSON.parse(el.dataset.option as string) as MenuOption;
  //   dispatch("optionselect", { option });
  // };
</script>

<svelte:window on:click={() => (open = false)} />

<div class="resp-menu__trigger">
  <slot />
  {#if open}
    <div
      {...$$restProps}
      class="resp-menu resp-menu--{align} {className}"
      bind:this={ref}
      transition:slide
    >
      <ul>
        {#each options as option, i (option.key)}
          {@const { label, separator = false } = option}
          <li
            class="resp-menu__item"
            class:resp-menu__item--separator={separator}
            class:resp-menu__item--disabled={option.disabled}
            class:resp-menu--submenu={option.submenus}
            class:resp-menu--open={option.collapsed === false}
            data-option={JSON.stringify(option)}
          >
            <slot name="menu-option" {option}>
              {#if option.href}
                <a href={option.href} class="resp-menu__label">
                  {label}
                </a>
              {:else}
                <span class="resp-menu__label">{label}</span>
              {/if}
            </slot>
            {#if option.submenus && option.collapsed === false}
              <svelte:self
                class="resp-menu__submenu"
                path={[...path, i]}
                options={option.submenus}
              />
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style lang="scss" global>
  .resp-menu {
    position: absolute;
    top: 110%;
    display: block;
    background: #fff;
    border-radius: var(--border-radius, 10px);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }

    &--center {
      left: 0;
      right: 0;
    }

    &__trigger {
      position: relative;
    }

    & > ul {
      list-style-type: none;
      list-style-position: inside;
      padding: 0;
      margin: 0;
      display: block;
      min-width: 250px;
    }

    ul > li {
      padding: 0;
      margin: 0;
    }

    &__item {
      position: relative;
      cursor: pointer;
      display: block;
      font-family: var(--font-family, inherit);
      font-size: var(--font-size, 14px);

      &--separator {
        padding: 0 0.5rem;
        border-bottom: 1px solid #dcdcdc;
      }

      &--disabled {
        cursor: not-allowed !important;
        opacity: 0.65;
      }

      &:hover:not(&--disabled) > .resp-menu__label {
        background: #f5f5f5;
        border-radius: 6px;
        text-decoration: none;
      }
    }

    &__label {
      position: relative;
      display: flex;
      color: #3b3b3b;
      padding: 0.6rem 1.25rem;
      flex-direction: row;
      align-items: center;
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
