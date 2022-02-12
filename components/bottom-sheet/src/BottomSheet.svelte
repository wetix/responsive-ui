<script lang="ts">
  import { noop } from "svelte/internal";
  import { tweened } from "svelte/motion";

  let className = "";
  export { className as class };
  export let open = false;
  export let height = 0;
  export let maskClosable = true;
  export let draggable = true;
  export let style = "";

  const tween = tweened(1, {
    duration: 150
  });

  $: if (open) {
    void tween.set(0);
  } else {
    void tween.set(1);
  }

  $: height = window.innerHeight * 0.85;
</script>

<div
  class="resp-bottom-sheet__overlay"
  on:click={maskClosable ? () => (open = false) : noop}
  style:opacity={1 - $tween}
  style:visibility={1 - $tween <= 0 ? "hidden" : "visible"}
/>
<div
  {...$$restProps}
  class="resp-bottom-sheet {className}"
  style:height="{height}px"
  style:visibility={1 - $tween <= 0 ? "hidden" : "visible"}
  style={`transform: translateY(${$tween * 100}%); ${style}`}
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
    z-index: 999;

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
      top: 10px;
      right: 15px;
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
