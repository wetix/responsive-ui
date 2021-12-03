<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Button from "@responsive-ui/button";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let title: null | string = null;
  export let width = "480px";
  export let open = true;
  export let closable = true;
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
      {#if title}
        <header class="resp-modal__header">
          <caption>{title}</caption>
          {#if closable}
            <span class="resp-modal__header-close">
              <span
                class="resp-modal__header-close-icon"
                on:click={() => (open = false)}
              >
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="close"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  ><path
                    d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                  /></svg
                >
              </span>
            </span>
          {/if}
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
        flex-grow: 1;
      }

      .resp-modal__header-close {
        flex: 0 0 30px;

        &-icon {
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
    }

    &__header,
    &__body,
    &__footer {
      padding: 10px;
    }

    &__footer {
      display: flex;
      flex-direction: row-reverse;
    }
  }
</style>
