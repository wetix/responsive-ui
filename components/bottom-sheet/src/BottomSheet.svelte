<script context="module" lang="ts">
  const queue: HTMLElement[] = [];
  // remove window scroll when all gone

  let scrollY = 0;
  const toggleOpen = (i: number, open: boolean) => {
    // queue[i] = open;
    // if (queue.some((v) => v === true)) {
    //   scrollY = window.scrollY;
    //   document.body.setAttribute(
    //     "style",
    //     `position: fixed; top: -${scrollY}px`
    //   );
    // } else {
    //   document.body.setAttribute("style", "");
    //   window.scrollTo(0, scrollY);
    // }
  };

  const pushQueue = (open: boolean): number => {
    // queue.push(open);
    return queue.length - 1;
  };

  const popQueue = (i: number) => {
    if (i >= queue.length) return;
    queue.splice(i, 1);
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { noop } from "svelte/internal";
  import { tweened } from "svelte/motion";

  export let open = false;
  export let height = 0;
  export let maskClosable = true;
  export let draggable = true;
  export let style = "";

  const tween = tweened(1, {
    duration: 150,
  });

  let index = 0;

  $: if (open) {
    toggleOpen(index, open);
    tween.set(0);
  } else {
    toggleOpen(index, open);
    tween.set(1);
  }

  onMount(() => {
    // index = pushQueue(open);
    // return () => {
    //   popQueue(index);
    // };
  });

  $: height = window.innerHeight * 0.85;
</script>

<div
  class="resp-bottom-sheet__overlay"
  on:click={maskClosable ? () => (open = false) : noop}
  style={`opacity: ${1 - $tween}; visibility: ${
    1 - $tween <= 0 ? "hidden" : "visible"
  }`}
/>
<div
  class="resp-bottom-sheet"
  style={`transform: translateY(${
    $tween * 100
  }%); height: ${height}px; visibility: ${
    1 - $tween <= 0 ? "hidden" : "visible"
  }; ${style}`}
>
  {#if draggable}
    <div class="resp-bottom-sheet__header">
      <div class="resp-bottom-sheet__drag" />
    </div>
  {/if}
  <slot />
</div>

<style lang="scss" global>
  .resp-bottom-sheet {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0 -4px 26px rgba(0, 0, 0, 0.4);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: 85%;
    padding-bottom: env(safe-area-inset-bottom, 15px);
    min-height: 120px;
    background: #fff;
    transition: all 0.3s;
    z-index: 50;

    &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      z-index: 50;
    }

    &__close {
      cursor: pointer;
      position: absolute;
      display: block;
      top: 10px;
      right: 15px;
      z-index: 50;
    }

    &__header {
      display: flex;
      padding: 0.5rem;
      justify-content: center;
    }

    &__drag {
      cursor: grab;
      height: 4px;
      width: 100px;
      border-radius: 3px;
      background: #dcdcdc;
    }
  }
</style>
