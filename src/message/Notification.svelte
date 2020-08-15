<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let className = "";

  export { className as class };
  export let title = "Notification Title",
    duration = 3000,
    message = "",
    style = "";

  let visible = true;

  onMount(() => {
    if (duration > 0) {
      setTimeout(() => {
        visible = false;
      }, duration);
    }
  });

  const onClose = () => {
    visible = false;
    dispatch("close");
  };
</script>

<style lang="scss">
  .notification {
    position: fixed;
    box-sizing: border-box;
    padding: var(--padding, 15px);
    display: block;
    border: 1px solid red;
    background: var(--white, #fff);
    transition: all 0.5s;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    z-index: 999;
  }
</style>

{#if visible}
  <div class={`notification ${className}`} {style}>
    <span on:click={onClose}>close</span>
    <div>{title}</div>
    <div>{message}</div>
  </div>
{/if}
