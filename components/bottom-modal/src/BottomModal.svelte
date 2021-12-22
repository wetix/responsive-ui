<script context="module" lang="ts">
  const queue: boolean[] = [];
  // remove window scroll when all gone

  let scrollY = 0;
  const toggleOpen = (i: number, open: boolean) => {
    queue[i] = open;
    if (queue.some((v) => v === true)) {
      scrollY = window.scrollY;
      document.body.setAttribute(
        "style",
        `position: fixed; top: -${scrollY}px`
      );
    } else {
      document.body.setAttribute("style", "");
      window.scrollTo(0, scrollY);
    }
  };

  const pushQueue = (open: boolean): number => {
    queue.push(open);
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
  export let closable = true;
  export let style = "";

  const tween = tweened(1, {
    duration: 200,
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
    index = pushQueue(open);
    return () => {
      popQueue(index);
    };
  });
</script>

<div
  class="resp-modal__overlay"
  on:click={closable ? () => (open = false) : noop}
  style={`opacity: ${1 - $tween}; visibility: ${
    1 - $tween <= 0 ? "hidden" : "visible"
  }`}
/>
<div
  class="resp-modal"
  style={`transform: translateY(${$tween * 100}%); visibility:${
    1 - $tween <= 0 ? "hidden" : "visible"
  };${style}`}
>
  {#if closable}
    <i class="resp-modal__close" on:click={() => (open = false)}>
      {@html `<svg width="1em" height="1em" viewBox="64 64 896 896" focusable="false" data-icon="close" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" /></svg>`}
    </i>
  {/if}
  <slot />
</div>

<style lang="scss" global>
  .resp-modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    z-index: 50;
  }

  .resp-modal {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0 -4px 26px rgba(0, 0, 0, 0.4);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: 90%;
    padding-bottom: env(safe-area-inset-bottom, 15px);
    min-height: 120px;
    background: #fff;
    transition: all 0.3s;
    z-index: 50;

    &__close {
      cursor: pointer;
      position: absolute;
      display: block;
      top: 10px;
      right: 15px;
      z-index: 50;
    }
  }
</style>
