<script lang="ts">
  import { fade } from "svelte/transition";

  let className = "";
  export { className as class };
  export let open = false;
  export let closable = true;
  export let width = "280px";
  export let placement = "left";
  export let style = "";
</script>

{#if open}
  <div
    class="responsive-ui-dock__overlay"
    on:click={closable ? () => (open = !open) : undefined}
    in:fade
    out:fade
  />
{/if}
<div
  class="responsive-ui-dock responsive-ui-dock--{placement} {className}"
  class:responsive-ui-dock--close={!open}
  style={`width:${width};${style}`}
>
  <slot />
</div>

<style lang="scss">
  @mixin dockStyle {
    position: fixed;
    top: 0;
    background-color: #fff;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    transition: all 0.5s;
    z-index: 100;
  }

  .responsive-ui-dock {
    @include dockStyle;
    box-shadow: 1px 0 10px rgba(0, 0, 0, 0.1);
    transform: translateX(0%);

    &--left {
      left: 0;
      &.responsive-ui-dock--close {
        transform: translateX(-110%);
      }
    }

    &--right {
      right: 0;
      &.responsive-ui-dock--close {
        transform: translateX(110%);
      }
    }

    &__overlay {
      @include dockStyle;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }

  @media screen and (max-width: 480px) {
    .responsive-ui-dock {
      width: 100% !important;
    }
  }
</style>
