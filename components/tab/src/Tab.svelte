<script lang="ts">
  import { tweened } from "svelte/motion";
  import type { TabItem } from "../types";

  const leftTween = tweened(0, { duration: 500 });
  let className = "";
  export { className as class };
  export let items: TabItem[] = [];
  export let selectedKey = "";

  // const hasSlots = !!$$slots.default;

  let tab: HTMLElement;
  let childNodes: NodeListOf<ChildNode>;
  let width = 0;

  $: {
    const index = items.findIndex((v) => v.key === selectedKey);
    if (tab && tab.children[index]) {
      const el = tab.children[index] as HTMLElement;
      // console.log(el.offsetLeft, el.offsetWidth);
      //   width = el.offsetWidth;
      //   console.log(leftTween, el.offsetLeft);
      leftTween.set(1);
    }
  }

  // const setWidth = () => {
  //   childNodes = tab.childNodes;
  //   // const el = childNodes[selected] as HTMLDivElement;
  // };

  // onMount(() => {
  //   setTimeout(() => {
  //     setWidth();
  //   }, 0);
  // });

  const handleSelectTab = (e: Event) => {
    const el = e
      .composedPath()
      .find((v) => v instanceof HTMLElement && v.dataset.key) as HTMLElement;
    if (!el) return;
    selectedKey = el.dataset.key as string;
  };
</script>

<div class="resp-tab {className}" {...$$restProps}>
  <header class="resp-tab__header">
    <ul bind:this={tab} class="resp-tab__box" on:click={handleSelectTab}>
      {#each items as item}
        {@const { key } = item}
        <li
          class="resp-tab__item"
          class:resp-tab__item--selected={selectedKey === key}
          data-key={key}
        >
          {item.label}
          {#if selectedKey === key}
            <span class="resp-tab__ink-bar" />
          {/if}
        </li>
      {/each}
    </ul>
    <div class="resp-tab__ink-bar" style={`left: ${$leftTween}px; width: ${width}px`} />
  </header>
  <ul>
    {#each items as item}
      <li><slot {selectedKey} {item} /></li>
      <!-- {#if item && item.component}
        <svelte:component this={item.component} />
      {/if} -->
    {/each}
  </ul>
</div>

<!-- {#if hasSlots}
  <slot {selectedKey} />
{:else} -->

<!-- {/if} -->
<style lang="scss" global>
  .resp-tab {
    position: relative;
    display: flex;
    color: var(--text-color, #505050);
    font-size: var(--font-size, 14px);
    border-top: 2px solid transparent;
    box-shadow: 0 6px 6px -4px rgba(0, 0, 0, 0.15);

    &__box {
      // padding: 0 15px;
      padding: 0;
      margin: 0;
      list-style: none;
      list-style-position: inside;
      display: flex;
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

    &__ink-bar {
      position: absolute;
      display: block;
      left: 0;
      bottom: 0;
      height: 2px;
      width: 100%;
      background: #fc4451;
      // transition: all 0.5s;
    }

    &__item {
      cursor: pointer;
      position: relative;
      text-align: center;
      padding: 0.5rem 1rem;
      //   transition: color 0.5s;

      &--selected {
        color: #fc4451;
      }
    }
  }
</style>
