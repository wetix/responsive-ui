<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NavItem } from "../types";

  const dispatch = createEventDispatcher();

  export let items: NavItem[];
  export let selected = 0;

  let tab: HTMLDivElement;
  let inkBar: HTMLDivElement;

  onMount(() => {
    const element = tab.childNodes[selected];
    if (element && element instanceof Element) {
      const coordinate: DOMRect = element.getBoundingClientRect();
      inkBar.style.left = `${coordinate.left}px`;
      inkBar.style.width = `${coordinate.width}px`;
    }
  });

  const onChangeTab = ({ target }: MouseEvent, i: number) => {
    inkBar.style.transition = "all 0.5s";
    const coordinate: DOMRect = (<HTMLDivElement>(
      target
    )).getBoundingClientRect();
    inkBar.style.left = `${coordinate.left}px`;
    inkBar.style.width = `${coordinate.width}px`;
    selected = i;
    dispatch("change", {
      tab: items[i].value,
    });
  };

  const handleScroll = (e: Event) => {
    inkBar.style.transition = "none";
    const coordinate: DOMRect = (<Element>(
      tab.childNodes[selected]
    )).getBoundingClientRect();
    inkBar.style.left = `${coordinate.left}px`;
    inkBar.style.width = `${coordinate.width}px`;
  };
</script>

<div class="tab" id="tab">
  <div class="tab__container" bind:this={tab} on:scroll={handleScroll}>
    {#each items as item, idx}
      <span
        on:click={(e) => onChangeTab(e, idx)}
        class="tab__item"
        class:active={idx === selected}
      >
        {item.title}
      </span>
    {/each}
  </div>

  <div class="ink-bar" bind:this={inkBar} />
</div>

<style lang="scss">
  .tab {
    z-index: 90;
    width: 100%;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);

    &__container {
      position: relative;
      width: 100%;
      display: inline-flex;
      background-color: #fc4451;
      overflow-x: scroll;
      scroll-behavior: smooth;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }

    &__item {
      cursor: pointer;
      margin: 0px 5px;
      padding: 15px 10px 10px 10px;
      color: white;
      font-size: 0.813rem;
      white-space: nowrap;
    }
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .tab__container::-webkit-scrollbar {
    display: none;
  }

  .ink-bar {
    width: 100%;
    position: absolute;
    margin-top: -5px;
    height: 5px;
    background: white;
  }

  .active {
    font-weight: bold;
  }
</style>
