<script lang="ts">
  import { noop } from "svelte/internal";
  import { tweened } from "svelte/motion";
  import { onMount } from "svelte";

  let className = "";
  export { className as class };
  export let open = false;
  export let maskClosable = true;
  export let closable = true;
  export let draggable = true;
  export let style = "";
  export let height = 0;
  let innerHeight = 0;

  const tween = tweened(1, {
    duration: 150
  });

  onMount(() => {
    innerHeight = window.innerHeight;
  });

  $: if (open) {
    void tween.set(0);
  } else {
    void tween.set(1);
  }

  $: offset = 1 - $tween;
  $: height = height == 0 ? innerHeight * 0.85 : height;
</script>

<div
  class="resp-bottom-sheet__overlay"
  on:click={maskClosable ? () => (open = false) : noop}
  style:opacity={offset}
  style:visibility={offset <= 0 ? "hidden" : "visible"}
/>
<div
  class="resp-bottom-sheet {className}"
  style:height={`${height}px`}
  {...$$restProps}
  style:visibility={offset <= 0 ? "hidden" : "visible"}
  style={`transform: translateY(${$tween * 100}%); ${style}`}
>
  {#if draggable}
    <div class="resp-bottom-sheet__header">
      <div class="resp-bottom-sheet__drag" />
    </div>
  {/if}
  {#if closable}
    <span class="resp-bottom-sheet__close">
      <i class="resp-bottom-sheet__close-icon" on:click={() => (open = false)}>
        {@html `<svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" /></svg>`}
      </i>
    </span>
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
    z-index: 996;

    &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      z-index: 900;
    }

    &__close {
      cursor: pointer;
      position: absolute;
      display: block;
      top: 1rem;
      right: 1rem;
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
