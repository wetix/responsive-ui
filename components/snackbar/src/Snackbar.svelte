<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { slideY } from "@wetix/animation";
  import Icon from "@responsive-ui/icon";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let text = "";
  export let variant = "default";
  export let rounded = true;
  export let show = true;

  const onClose = () => {
    show = false;
    dispatch("close");
  };
</script>

<style lang="scss">
  .responsive-ui-snackbar {
    position: fixed;
    margin: 0 auto;
    bottom: 15px;
    left: 15px;
    background: #3b3b3b;
    color: #fff;
    font-size: var(--font-size, 14px);
    padding: 10px 15px;
    font-size: 0.9rem;
    font-family: inherit;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
    stroke: #fff;
    display: inline-flex;
    align-items: center;
    z-index: 1000;

    &--success {
      background: #32a852;
    }

    &--error {
      background: #ff0033;
    }

    &--rounded {
      border-radius: 3px;
    }

    &__close {
      cursor: pointer;
      margin-left: 10px;
    }
  }
</style>

{#if show}
  <div
    class="responsive-ui-snackbar responsive-ui-snackbar--{variant} {className}"
    class:responsive-ui-snackbar--rounded={rounded}
    in:slideY={{ duration: 100, direction: 'up' }}
    out:fade>
    <slot>{text}</slot>
    <span class="responsive-ui-snackbar__close">
      <Icon type="x" stroke="#fff" on:click={onClose} />
    </span>
  </div>
{/if}
