<script context="module" lang="ts">
  import { linear } from "svelte/easing";

  interface SlideYParams {
    direction?: "up" | "down";
    duration?: number;
    easing?: (t: number) => number;
  }

  const slideY = (_: HTMLElement, opt: SlideYParams) => {
    opt = Object.assign({ duration: 150, direction: "up", easing: linear }, opt);
    const { duration, direction } = opt;
    return {
      duration,
      css: (t: number) => {
        let ratio = 100 - t * 100;
        if (direction === "up") ratio *= -1;
        return `transform: translateY(${ratio}%);`;
      }
    };
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let message = "";
  export let duration = 150;
  export let variant = "default";
  export let closable = true;
  export let rounded = true;
  export let show = true;

  const handleClose = () => {
    show = false;
    dispatch("close");
  };
</script>

{#if show}
  <div
    class="resp-snackbar resp-snackbar--{variant} {className}"
    class:resp-snackbar--rounded={rounded}
    in:slideY={{ direction: "up", duration }}
    out:slideY={{ direction: "down", duration }}
  >
    <slot>{message}</slot>
    {#if closable}
      <i class="resp-snackbar__icon" on:click={handleClose}>
        {@html `<svg width="1em" height="1em" viewBox="64 64 896 896" focusable="false" data-icon="close" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" /></svg>`}
      </i>
    {/if}
  </div>
{/if}

<style lang="scss" global>
  .resp-snackbar {
    position: fixed;
    margin: 0 auto;
    bottom: 15px;
    left: 15px;
    background: #3b3b3b;
    color: #fff;
    font-size: var(--font-size, 14px);
    line-height: 1.5;
    padding: 10px 12px;
    font-size: 0.9rem;
    font-family: inherit;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
    stroke: #fff;
    transform: translateY(0%);
    display: inline-flex;
    align-items: center;
    z-index: 1000;

    &__icon {
      display: inline-flex;
      cursor: pointer;
      margin-left: 12px;
    }

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
