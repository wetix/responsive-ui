<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Button from "@responsive-ui/button";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let title: null | string = null;
  // export let useKeyboard = false;
  export let width = "480px";
  export let open = true;
  export let maskClosable = true;
  export let style = "";

  $: maxHeight = window.innerHeight - 60;

  let clientWidth = 0;
  let clientHeight = 0;
</script>

{#if open}
  <div
    class="resp-modal__overlay"
    in:fade
    out:fade
    on:click={maskClosable ? () => (open = false) : undefined}
  />
  <div
    class="resp-modal {className}"
    bind:clientWidth
    bind:clientHeight
    in:fade
    out:fade
    style={`width: ${width}; margin-top: ${
      (-1 * clientHeight) / 2
    }px; margin-left: ${
      (-1 * clientWidth) / 2
    }px; max-height: ${maxHeight}px; ${style}`}
  >
    <slot name="header">
      {#if title != null}
        <header class="resp-modal__header">
          <caption>{title}</caption>
        </header>
      {/if}
    </slot>
    <div class="resp-modal__body">
      <slot />
    </div>
    <slot name="footer">
      <footer class="resp-modal__footer">
        <Button
          variant="primary"
          on:click={() => dispatch("confirm")}
          style="margin-left: 6px">OK</Button
        >
        <Button on:click={() => dispatch("cancel")}>Cancel</Button>
      </footer>
    </slot>
  </div>
{/if}

<style lang="scss">
  .resp-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    font-family: inherit;
    // word-break: break-word;
    margin: 0 auto;
    background: var(--color-white, #fff);
    box-shadow: 0 0 26px rgba(0, 0, 0, 0.3);
    border-radius: var(--border-radius, 5px);
    overflow: hidden;
    z-index: 999;

    &__overlay {
      position: fixed;
      background: rgba(0, 0, 0, 0.65);
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
    }

    &__header {
      display: flex;

      caption {
        font-size: var(--font-size-lg, 24px);
        font-weight: 600;
      }
    }

    &__header,
    &__body,
    &__footer {
      padding: 10px;
    }

    &__footer {
      display: flex;
      flex-direction: row-reverse;
      //   position: absolute;
      //   bottom: 0;
      //   width: 100%;
      //   border-top: 1px solid var(--color-primary, #fc4451);

      //   .btn {
      //     display: flex;
      //     justify-content: center;
      //     align-items: center;
      //     width: 50%;
      //     height: 50px;
      //     color: var(--color-white, #ffffff);
      //     background: var(--color-primary, #fc4451);

      //     &.secondary {
      //       background: var(--color-white, #ffffff);
      //       color: var(--color-primary, #fc4451);
      //     }
      //   }
    }
  }
</style>
