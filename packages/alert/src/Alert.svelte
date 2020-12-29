<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();

  export let message = "";

  const onClick = () => {
    dispatch("close");
  };
</script>

<style lang="scss">
  .responsive-ui-alert__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .responsive-ui-alert {
    border-radius: 10px;
    padding: 5px 10px;
    box-shadow: 0 -4px 26px rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
    text-align: center;
    height: auto;
    color: white;
    background: #000;
  }
</style>

<div
  class="responsive-ui-alert__overlay"
  on:click|preventDefault|stopPropagation={onClick}
  in:fade
  out:fade>
  <div class="responsive-ui-alert" in:fade out:fade={{ delay: 300 }}>
    <slot>{message}</slot>
  </div>
</div>
