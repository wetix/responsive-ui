<script context="module">
  // remove window scroll when all gone
</script>

<script lang="ts">
  import { tweened } from "svelte/motion";

  export let open = false;
  export let closable = true;
  export let style = "";

  const tween = tweened(1, {
    duration: 200,
  });

  let scrollY = 0;

  $: if (open) {
    scrollY = window.scrollY;
    // document.body.setAttribute("style", `position:fixed;top:-${scrollY}px`);
    tween.set(0);
  } else {
    document.body.setAttribute("style", "");
    window.scrollTo(0, scrollY);
    tween.set(1);
  }
</script>

<style lang="scss">
  .responsive-ui-modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    z-index: 500;
  }

  .responsive-ui-modal {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0 -4px 26px rgba(0, 0, 0, 0.4);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: 90%;
    padding-bottom: env(safe-area-inset-bottom, 15px);
    min-height: 120px;
    background: #fff;
    transition: all 0.3s;
    z-index: 600;

    .close {
      position: absolute;
      top: 15px;
      right: 10px;

      svg {
        display: block;
      }
    }
  }
</style>

<div
  class="responsive-ui-modal__overlay"
  on:click={closable ? () => (open = false) : null}
  style={`opacity:${1 - $tween}; visibility:${1 - $tween <= 0 ? 'hidden' : 'visible'}`}>
  <div
    class="responsive-ui-modal"
    on:click|stopPropagation
    style={`transform:translateY(${$tween * 100}%);${style}`}>
    {#if closable}
      <i class="close" on:click={() => {open = false}}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16px"
            height="16px"
            stroke="#000"
            stroke-width="1.5"
            stroke-linecap="square"
            stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </i>
    {/if}
    <slot />
  </div>
</div>
