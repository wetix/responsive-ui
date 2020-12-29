<script lang="ts">
  import { fade } from "svelte/transition";
</script>

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
      width: 45px;
      height: 45px;
      border: 5px solid var(--primary-color, #fc4451);
      border-right-color: transparent;
      border-radius: 50%;
      position: relative;
      animation: rotate 1s linear infinite;

      &:after {
        content: "";
        width: 5px;
        height: 5px;
        background: var(--primary-color, #fc4451);
        border-radius: 50%;
        position: absolute;
        top: 1px;
        left: 29px;
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

<div class="responsive-ui-loader" in:fade out:fade>
  <div class="responsive-ui-loader__spinner" />
</div>
