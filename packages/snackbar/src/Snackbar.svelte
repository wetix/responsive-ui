<script lang="ts">
  import { slideY } from "@wetix/animation";
  import Icon from "@responsive-ui/icon";

  export let message = "";
  export let variant = "default";
  export let rounded = true;

  let close = false;
  const onClose = () => {
    close = true;
  };
</script>

<style lang="scss">
  .responsive-ui-snackbar {
    position: fixed;
    margin: 0 auto;
    bottom: 15px;
    left: 15px;
    right: 15px;
    background: #3b3b3b;
    color: #fff;
    padding: 10px 15px;
    font-size: 0.9rem;
    font-family: inherit;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
    stroke: #fff;
    display: flex;
    align-items: center;

    &--success {
      background: #32a852;
    }

    &--error {
      background: #ff0033;
    }

    &--rounded {
      border-radius: 3px;
    }
  }
</style>

{#if !close}
  <div
    class="responsive-ui-snackbar responsive-ui-snackbar--{variant}"
    class:responsive-ui-snackbar--rounded={rounded}
    in:slideY
    out:slideY>
    <slot>{message}</slot>
    <Icon type="x" on:click={onClose} />
  </div>
{/if}
