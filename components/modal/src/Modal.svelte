<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Button from "@responsive-ui/button";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let caption: null | string = null;
  export let outlined = false;
  export let width = 480;
  export let open = true;
  export let closable = true;
  export let hasHeader = true;
  export let hasFooter = true;
  export let hasMask = true;
  export let maskClosable = true;

  let scrollY = 0;

  $: if (open) {
    const bodyStyle = document.body.getAttribute("style") || "";
    document.body.dataset.style = bodyStyle;
    document.body.dataset.scrollY = scrollY.toString();
    setTimeout(() => {
      document.body.setAttribute(
        "style",
        `position: fixed; top: -${scrollY}px; ${bodyStyle}`
      );
    }, 0);
  } else {
    const { style = "" } = document.body.dataset;
    // restore to original style
    document.body.setAttribute("style", style);
    setTimeout(() => {
      // restore to position scroll-y
      window.scrollTo(0, scrollY);
    }, 0);
  }
</script>

<svelte:window bind:scrollY />

{#if open}
  <div class="resp-modal__box" class:resp-modal--outlined={outlined}>
    {#if hasMask}
      <div
        class="resp-modal__overlay"
        in:fade
        out:fade
        on:click={maskClosable
          ? () => {
              open = false;
              dispatch("cancel");
            }
          : undefined}
      />
    {/if}
    <div
      {...$$restProps}
      class="resp-modal {className}"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-header"
      in:fade
      out:fade
      style:width={isNaN(width) ? `${width}` : `${width}px`}
    >
      {#if hasHeader}
        <header id="modal-header" class="resp-modal__header">
          <caption>{caption || ""}</caption>
        </header>
      {/if}
      {#if closable}
        <span class="resp-modal__close">
          <i
            class="resp-modal__close-icon"
            on:click={() => {
              open = false;
              dispatch("cancel");
            }}
          >
            {@html `<svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" /></svg>`}
          </i>
        </span>
      {/if}

      <div class="resp-modal__body">
        <slot />
      </div>
      {#if hasFooter}
        <footer class="resp-modal__footer">
          <slot name="footer">
            <Button
              variant="primary"
              on:click={() => dispatch("ok")}
              style="margin-left: 6px">OK</Button
            >
            <Button on:click={() => dispatch("cancel")}>Cancel</Button>
          </slot>
        </footer>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss" global>
  .resp-modal {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-family: inherit;
    margin: 0 auto;
    width: 480px;
    max-width: calc(100% - 40px);
    max-height: calc(100vh - 40px);
    background: var(--color-white, #fff);
    box-shadow: 0 0 26px rgba(0, 0, 0, 0.3);
    border-radius: var(--border-radius, 10px);
    overflow: hidden;
    z-index: inherit;

    &__overlay,
    &__box {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
    }

    &__overlay {
      background: rgba(0, 0, 0, 0.65);
      z-index: inherit;
    }

    &__box {
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 997;
    }

    &__header {
      display: flex;

      caption {
        text-align: left;
        font-size: var(--font-size-lg, 24px);
        font-weight: 600;
        flex-grow: 1;
        min-width: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 0.25rem;
        overflow: hidden;
      }
    }

    &__close {
      position: absolute;
      cursor: pointer;
      right: 1rem;
      top: 1rem;
      flex: 0 0 30px;

      &-icon {
        position: relative;
        left: 5px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        transition: all 0.3s;

        &:hover {
          color: #000;
          border-radius: 50%;
          background: #f7f7f7;
        }
      }
    }

    &__header,
    &__body,
    &__footer {
      width: 100%;
      padding: 1rem;
      box-sizing: border-box;
    }

    &__body {
      overflow-y: auto;
      flex-grow: 1;
      min-height: 0;
    }

    &__footer {
      display: flex;
      flex-direction: row-reverse;
    }

    &--outlined {
      $borderColor: #f5f5f5;
      .resp-modal__header {
        border-bottom: 1px solid $borderColor;
      }
      .resp-modal__footer {
        border-top: 1px solid $borderColor;
      }
    }
  }
</style>
