<script lang="ts">
  import { onMount } from "svelte";
  import type { TabItem } from "../types";

  let className = "";
  export { className as class };
  export let items: TabItem[] = [];
  export let selectedKey = "";

  const hasSlots = !!$$slots.default;

  let tab: HTMLElement;
  let childNodes: NodeListOf<ChildNode>;
  let left = 0;
  let width = 0;

  const setWidth = () => {
    childNodes = tab.childNodes;
    // const el = childNodes[selected] as HTMLDivElement;
    // left = el.offsetLeft;
    // width = el.offsetWidth;
  };

  onMount(() => {
    setTimeout(() => {
      setWidth();
    }, 0);
  });

  const onChange = (_: Event, i: number) => {
    // selected = i;
    setWidth();
  };
</script>

<div class="resp-tab {className}" {...$$restProps}>
  <nav bind:this={tab}>
    {#each items as item, i}
      <!-- class:resp-tab__item--selected={selected == i} -->
      <span class="resp-tab__item" on:click={(e) => onChange(e, i)}>
        {item.label}
      </span>
    {/each}
  </nav>
  <div class="resp-tab__ink-bar" style={`left:${left}px;width:${width}px`} />
</div>

{#if hasSlots}
  <slot {selectedKey} />
{:else}
  {#each items as item}
    {#if item && item.component}
      <svelte:component this={item.component} />
    {/if}
  {/each}
{/if}

<style lang="scss" global>
  .resp-tab {
    position: relative;
    display: flex;
    color: var(--text-color, #505050);
    font-size: var(--font-size, 14px);
    border-top: 2px solid transparent;
    box-shadow: 0 6px 6px -4px rgba(0, 0, 0, 0.15);

    &__ink-bar {
      position: absolute;
      display: block;
      bottom: 0;
      margin-top: -2px;
      height: 2px;
      width: 100px;
      background: #fc4451;
      transition: all 0.5s;
    }

    nav {
      // padding: 0 15px;
      white-space: nowrap;
      overflow-x: scroll;
      -ms-overflow-style: none; /* Internet Explorer 10+ */
      scrollbar-width: none; /* Firefox */

      &::-webkit-scrollbar {
        display: none;
      }
      /* Optional: show position indicator in red */
      ::-webkit-scrollbar-thumb {
        background: transparent;
      }
    }

    &__item {
      cursor: pointer;
      display: inline-block;
      position: relative;
      text-align: center;
      padding: 0.5rem 1rem;
      transition: color 0.5s;
    }

    &__item--selected {
      color: #fc4451;
    }
  }
</style>
