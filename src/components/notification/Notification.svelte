<script lang="ts">
  import { slide } from "svelte/transition";

  export let placement = "topLeft",
    title = "",
    description = "",
    style = "";
</script>

<style lang="scss">
  $position: 25px;

  .notification {
    position: fixed;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    max-width: 360px;
    box-sizing: border-box;
    // box-shadow: 0 0 26px rgba(0, 0, 0, 0.3);
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    z-index: 999;

    &.topLeft {
      top: $position;
      left: $position;
    }

    &.topRight {
      top: $position;
      right: $position;
    }

    &.bottomLeft {
      bottom: $position;
      left: $position;
    }

    &.bottomRight {
      bottom: $position;
      right: $position;
    }
  }
</style>

<div class={`notification ${placement}`} {style} in:slide out:slide on:click>
  <div>{title}</div>
  <div>{description}</div>
</div>
