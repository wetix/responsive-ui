<script lang="ts">
  import { fade } from "svelte/transition";

  export let open = true,
    width = "360px";
</script>

<style lang="scss">
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 50;
  }
  .dock {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background: #fff;
    width: 360px;
    transform: translateX(-100%);
    transition: all 0.5s;
    box-shadow: 3px 0 20px -2px rgba(0, 0, 0, 0.2);
    z-index: 50;

    &.open {
      transform: translateX(0);
    }
  }

  @media only screen and (max-width: 650px) {
    .dock {
      right: 0;
      min-height: 100%;
      overflow-y: auto;
      width: auto;
      z-index: 999;
    }
  }
</style>

{#if open}
  <div class="overlay" in:fade out:fade on:click={() => (open = false)} />
  <div class="dock" class:open style={`width:${width}`}>
    <slot />
  </div>
{/if}
