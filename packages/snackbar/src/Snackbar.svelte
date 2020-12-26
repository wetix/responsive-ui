<script lang="ts">
  import { slideY } from "@wetix/animation";

  export let message = "";
</script>

<style lang="scss">
  .responsive-ui-snackbar {
    background: #3b3b3b;
    color: #fff;
    padding: 10px;
    // border-radius: 3px;
    width: 100%;
    font-size: 0.9rem;
    font-family: inherit;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);

    // &.error {
    //   background: #ff0033;
    // }

    // &.success {
    //   background: rgb(55, 179, 55);
    // }
  }
</style>

<!-- {#if !hide} -->
<!-- <div class="container" in:slideY out:slideY></div> -->
<div class="responsive-ui-snackbar">
  <slot>{message}</slot>
</div>
<!-- {/if} -->
