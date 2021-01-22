<script lang="ts">
  import { fade } from "svelte/transition";

  let className = "";
  export { className as class };
  export let open = false;
  export let width = "280px";
  export let placement = "";
  export let style = "";
</script>

{#if open}
  <div
    class="responsive-ui-dock responsive-ui-dock__overlay"
    on:click={() => (open = !open)}
    in:fade
    out:fade
  />
{/if}
<div
  class="responsive-ui-dock {className}"
  class:responsive-ui-dock--close={!open}
  style={`width:${width};${style}`}
>
  <slot />
</div>

<style lang="scss">
  .responsive-ui-dock {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    height: 100%;
    transition: all 0.5s;
    z-index: 100;
    box-shadow: 1px 0 10px rgba(0, 0, 0, 0.1);

    &__overlay {
      right: 0;
      bottom: 0;
      box-shadow: none;
      width: auto;
      background-color: rgba(0, 0, 0, 0.6);
    }

    &--close {
      transform: translateX(-110%);
    }
  }

  @media screen and (max-width: 480px) {
    .responsive-ui-dock {
      width: 100% !important;
    }
  }
</style>
