<script lang="ts">
  import { slide } from "svelte/transition";

  import Icon from "../icon/index.svelte";

  let className = "";
  export { className as class };

  export let collapsed = false,
    level = [],
    items = [];
</script>

<style lang="scss">
  .menu {
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    transition: all 0.5s;
    list-style-type: none;
    list-style-position: inside;

    .menu-item {
      border: 1px solid red;

      position: relative;
      cursor: pointer;
      display: block;
      line-height: 36px;
      text-align: center;
      transition: all 0.5s;
      /* Required for text-overflow to do anything */
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      .menu-control {
        transition: all 0.5s;
      }

      &.selected {
        .menu-control {
          transform: rotate(180deg);
        }

        a {
          background: #fff;
          color: var(--primary-color, #fc4451);
        }
      }

      &.disabled {
        cursor: not-allowed !important;
        opacity: 0.8;
      }
    }

    .menu-title {
      border: 1px solid green;
      position: relative;
      display: flex;
      color: #3b3b3b;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 0 8px;
      text-decoration: none;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      transition: all 0.65s;

      .menu-label {
        flex-grow: 1;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 10px;
      }

      .icon {
        position: absolute;
        right: 10px;
        display: inline-block;
        transition: all 0.3s;

        svg {
          fill: #000;
        }
      }

      &:hover {
        color: var(--primary-color, #fc4451);
      }
    }

    &.submenu {
      display: block;
    }
  }
</style>

{#if !collapsed}
  <ul class={`menu ${className}`} transition:slide>
    {#each items as item, i}
      <li
        class="menu-item"
        class:disabled={item.disabled}
        class:selected={item.selected}
        data-item={item.disabled ? null : JSON.stringify([...level, i])}>
        <a href={item.href} class="menu-title">
          <span>
            <Icon type={item.icon} dimension="24px" />
          </span>
          <div class="menu-label">{item.title}</div>
          <span class="menu-control">
            {#if level.length === 0 && item.submenus}
              <Icon type="chevron-up" dimension="24px" />
            {/if}
          </span>
        </a>
        {#if item.submenus}
          <svelte:self
            class="submenu"
            collapsed={!item.collapsed}
            level={[...level, i]}
            items={item.submenus} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}
