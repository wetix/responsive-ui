<script context="module" lang="ts">
  const queue: boolean[] = [];
  // remove window scroll when all gone

  let scrollY = 0;
  const toggleOpen = (i: number, open: boolean) => {
    queue[i] = open;
    if (queue.some((v) => v === true)) {
      scrollY = window.scrollY;
      document.body.setAttribute("style", `position:fixed;top:-${scrollY}px`);
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
  import { tweened } from "svelte/motion";
  import Icon from "@responsive-ui/icon";

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
  class="responsive-ui-modal__overlay"
  on:click={closable ? () => (open = false) : null}
  style={`opacity:${1 - $tween};visibility:${
    1 - $tween <= 0 ? "hidden" : "visible"
  }`}
/>
<div
  class="responsive-ui-modal"
  style={`transform:translateY(${$tween * 100}%);visibility:${
    1 - $tween <= 0 ? "hidden" : "visible"
  };${style}`}
>
  {#if closable}
    <span class="responsive-ui-modal__close" on:click={() => (open = false)}>
      <Icon type="x" />
    </span>
  {/if}
  <slot />
</div>

<style lang="scss">
  .responsive-ui-modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    z-index: 50;
  }

  .responsive-ui-modal {
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
