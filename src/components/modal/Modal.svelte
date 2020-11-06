<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import Button from "~/components/button/index.svelte";

  const dispatch = createEventDispatcher();

  export let open = false,
    closable = false,
    style = "";
</script>

<style lang="scss">
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  .modal {
    position: absolute;
    top: 0;
    left: 50%;
    background: #fff;
    transform: translate(-50%, 0%);
    max-width: calc(100% - 30px);
    width: 45%;
    bottom: 0;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    z-index: 999;

    footer {
      display: flex;
      padding: var(--padding, 10px);
    }
  }

  /* mobile view */
  @media only screen and (max-width: 768px) {
    .modal {
      position: absolute;
      top: auto;
      transform: translate(0%, 0%);
      border-top-left-radius: var(--big-border-radius, 10px);
      border-top-right-radius: var(--big-border-radius, 10px);
      left: 0;
      height: auto;
      min-height: 100px;
      background: #fff;
      width: 100%;
      box-shadow: 0 -4px 26px rgba(0, 0, 0, 0.4);
      max-width: 100%;
    }
  }
</style>

{#if open}
  <div
    class="overlay"
    in:fade
    on:click={closable ? () => (open = false) : null} />
  <div class="modal" {style}>
    <section />
    <slot name="footer">
      <footer>
        <Button
          on:click={(e) => dispatch('close', e)}
          secondary
          title="Cancel" />
        <Button on:click={(e) => dispatch('ok', e)} title="OK" />
      </footer>
    </slot>
  </div>
{/if}
