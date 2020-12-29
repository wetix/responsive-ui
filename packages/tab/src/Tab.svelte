<script lang="ts">
  import { onMount } from "svelte";

  import type { TabItem } from "../types";

  export let items: Array<TabItem> = [];
  export let selected = 0;
  export let style = "";

  const hasSlots = !!$$slots.default;

  let tab: null | HTMLDivElement;
  let childNodes: HTMLCollectionOf<Element>;
  onMount(() => {
    childNodes = tab.getElementsByClassName("responsive-ui-tab__item");
    if (childNodes[selected]) {
      console.log(childNodes[selected]);
    }
  });

  const onChange = (_: Event, i: number) => {
    // coordinate = (target as HTMLElement).getBoundingClientRect();
    selected = i;
  };
</script>

<style lang="scss">
  .responsive-ui-tab {
    position: relative;
    color: #505050;
    border-top: 2px solid transparent;
    display: inline-flex;
    box-shadow: 0 5px 6px -4px rgba(0, 0, 0, 0.15);

    &__ink-bar {
      position: absolute;
      bottom: 0;
      margin-top: -2px;
      display: block;
      height: 2px;
      width: 100%;
      background: #fc4451;
      transition: all 0.5s;
    }

    nav {
      white-space: nowrap;
      overflow-x: scroll;
    }

    &__item {
      display: inline-block;
      cursor: pointer;
      position: relative;
      text-align: center;
      padding: 8px 15px;
      transition: color 0.5s;
    }

    &__item--selected {
      color: #fc4451;
    }

    // &.secondary .selected {
    //   color: #fc4451;
    //   opacity: 1;
    // }
  }

  // .ink-bar {

  //   &.secondary {
  //     background: #fc4451;
  //   }
  // }
</style>

<div class="responsive-ui-tab" {style}>
  <nav bind:this={tab}>
    {#each items as item, i}
      <span
        class="responsive-ui-tab__item"
        class:responsive-ui-tab__item--selected={selected == i}
        on:click={(e) => onChange(e, i)}>
        {item.title}
      </span>
    {/each}
  </nav>
  <div class="responsive-ui-tab__ink-bar" />
</div>

{#if hasSlots}
  <slot {selected} />
{:else}
  {#each items as item}
    {#if item && item.component}
      <svelte:component this={item.component} />
    {/if}
  {/each}
{/if}
