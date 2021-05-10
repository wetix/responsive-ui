<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();

  export let visible = true;
  export let height = 150;

  let clientHeight: number | null = null;

  const width = window.innerWidth * 0.8;
</script>

{#if visible}
  <div
    class="responsive-ui-modal__overlay"
    in:fade
    out:fade
    on:click={() => dispatch("cancel")}
  />
  <div
    class="responsive-ui-modal"
    bind:clientHeight
    in:fade
    out:fade
    style={`width:${width}px;margin-left:${-1 * (width / 2)}px;height:${
      height !== 150 ? height : clientHeight
    }px;margin-top:${-1 * (clientHeight / 2)}px`}
  >
    <slot />
    <footer class="responsive-ui-modal__footer">
      <div class="btn secondary" on:click={() => dispatch("cancel")}>
        CANCEL
      </div>
      <div class="btn" on:click={() => dispatch("confirm")}>OK</div>
    </footer>
  </div>
{/if}

<style lang="scss">
  .responsive-ui-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    word-break: break-word;
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

    &__footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      border-top: 1px solid var(--color-primary, #fc4451);

      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 50px;
        color: var(--color-white, #ffffff);
        background: var(--color-primary, #fc4451);

        &.secondary {
          background: var(--color-white, #ffffff);
          color: var(--color-primary, #fc4451);
        }
      }
    }
  }
</style>
