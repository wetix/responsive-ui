<script lang="ts">
  import { noop } from "svelte/internal";
  import { fade } from "svelte/transition";

  let className = "";
  export { className as class };
  export let open = false;
  export let closable = true;
  export let maskedClosable = true;
  export let width = "280px";
  export let placement = "left";
</script>

{#if open}
  <div
    class="resp-docker__overlay"
    on:click={maskedClosable ? () => (open = !open) : noop}
    in:fade
    out:fade
  />
{/if}
<div
  {...$$restProps}
  class="resp-docker resp-docker--{placement} {className}"
  class:resp-docker--close={!open}
  style={`width: ${width}`}
>
  <slot />
</div>

<style lang="scss">
  @mixin dockerStyle {
    position: fixed;
    top: 0;
    background-color: #fff;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    transition: all 0.5s;
    z-index: 100;
  }

  .resp-docker {
    @include dockerStyle;
    box-shadow: 1px 0 10px rgba(0, 0, 0, 0.1);
    transform: translateX(0%);

    &--left {
      left: 0;
      &.resp-docker--close {
        transform: translateX(-110%);
      }
    }

    &--right {
      right: 0;
      &.resp-docker--close {
        transform: translateX(110%);
      }
    }

    &__overlay {
      @include dockerStyle;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }

  @media screen and (max-width: 480px) {
    .resp-docker {
      width: 100% !important;
    }
  }
</style>
