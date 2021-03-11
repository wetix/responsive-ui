<script lang="ts">
  import { fade } from "svelte/transition";

  export let fit = "none";
  export let size = "default";
</script>

{#if fit === "viewport"}
  <div class="responsive-ui-loader" in:fade out:fade>
    <div
      class="responsive-ui-loader__spinner responsive-ui-loader__spinner--{size}"
    />
  </div>
{:else}
  <div
    class="responsive-ui-loader__spinner responsive-ui-loader__spinner--{size}"
  />
{/if}

<style lang="scss">
  .responsive-ui-loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;

    &__spinner {
      position: relative;
      width: 45px;
      height: 45px;
      border: 5px solid var(--primary-color, #fc4451);
      border-right-color: transparent;
      border-radius: 50%;
      animation: rotate 1s linear infinite;

      &--small {
        width: 18px;
        height: 18px;
        border-width: 2px;
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
