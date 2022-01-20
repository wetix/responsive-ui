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
  export const path: number[] = [];

  const handleSelect = (e: Event) => {
    e.stopPropagation();
    const el = e
      .composedPath()
      .find((v) => v instanceof HTMLElement && v.dataset.option) as HTMLElement;
    if (!el) return;
    const option = JSON.parse(el.dataset.option as string) as MenuOption;
    dispatch("optionselect", { option });
  };
</script>

<div class="resp-menu__trigger" on:click={() => (open = !open)}>
  <slot />
  {#if open}
    <div
      {...$$restProps}
      class="resp-menu {className}"
      bind:this={ref}
      on:click={handleSelect}
      on:click
      transition:slide
    >
      <ul>
        {#each options as option, i (option.key)}
          {@const { href = "", label, separator = false } = option}
          <li
            class="resp-menu__item"
            class:resp-menu__item--separator={separator}
            class:resp-menu__item--disabled={option.disabled}
            data-option={JSON.stringify(option)}
          >
            <div
              class="resp-menu__item"
              class:resp-menu--submenu={option.submenus}
              class:resp-menu--open={option.collapsed === false}
            >
              <slot name="menu-option" {option}>
                <div class="resp-menu__label">
                  <a {href}>{label}</a>
                </div>
              </slot>
            </div>
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
    top: 100%;
    // left: 0.5rem;
    right: 0;
    display: block;
    background: #fff;
    padding: 0.25rem;
    border-radius: var(--border-radius, 10px);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);

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

    &__item {
      position: relative;
      cursor: pointer;
      display: block;
      margin: 2px 0;
      font-family: var(--font-family, inherit);
      font-size: var(--font-size, 14px);

      &--separator {
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #dcdcdc;
      }

      &--disabled {
        cursor: not-allowed !important;
        opacity: 0.65;
      }

      &:hover:not(&--disabled) > .resp-menu__label {
        // background: rgba(252, 68, 80, 0.6);
        background: #f5f5f5;
        border-radius: 6px;
      }
    }

    &__label {
      position: relative;
      display: flex;
      color: #3b3b3b;
      padding: 0.5rem 1rem;
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
