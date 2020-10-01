<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let // top-left | top-right | bottom-left | bottom-right
    placement = "top-left",
    title = "",
    message = "",
    style = "";

  let visible = true;

  const onClose = () => {
    visible = false;
    dispatch("close");
  };
</script>

<style lang="scss">
  $posX: 25px;
  $posY: 25px;

  .notification {
    position: fixed;
    background: #fff;
    padding: 15px;
    border-radius: 5px;
    max-width: 360px;
    box-sizing: border-box;
    // box-shadow: 0 0 26px rgba(0, 0, 0, 0.3);
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    z-index: 999;
    &.top-left {
      top: $posY;
      left: $posX;
    }
    &.top-right {
      top: $posY;
      right: $posX;
    }
    &.bottom-left {
      bottom: $posY;
      left: $posX;
    }
    &.bottom-right {
      bottom: $posY;
      right: $posX;
    }

    header {
      display: flex;
      .title {
        overflow: hidden;
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 10px;
      }
      .close {
        svg {
          cursor: pointer;
          display: block;
        }
      }
    }
  }
</style>

{#if visible}
  <div class={`notification ${placement}`} {style} on:click>
    <header>
      <div class="title">{title}</div>
      <div class="close">
        <svg
          on:click={onClose}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 512 512">
          <line
            x1="368"
            y1="368"
            x2="144"
            y2="144"
            style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
          <line
            x1="368"
            y1="144"
            x2="144"
            y2="368"
            style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" /></svg>
      </div>
    </header>
    <div>{message}</div>
  </div>
{/if}
