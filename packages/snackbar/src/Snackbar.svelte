<script lang="ts">
  // import { slideY } from "@wetix/animation";

  export let hide = false;
  export let message = "";
  export let padding = 0;
  export let success = false;
</script>

<style lang="scss">
  .container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    z-index: 150;
  }

  .responsive-ui-snackbar {
    background: #3b3b3b;
    color: #fff;
    padding: 10px;
    // border-radius: 3px;
    width: 100%;
    font-size: 0.9rem;
    font-family: inherit;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);

    &.error {
      background: #ff0033;
    }

    &.success {
      background: rgb(55, 179, 55);
    }
  }
</style>

{#if !hide}
  <div class="container" style={`padding:${padding}`}>
    <div class="responsive-ui-snackbar">
      <slot>{message}</slot>
    </div>
  </div>
{/if}
