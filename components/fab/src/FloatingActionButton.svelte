<script lang="ts">
  import { scale } from "svelte/transition";

  let className = "";
  export { className as class };
  export let transition = true;
</script>

<span
  class="resp-fab {className}"
  {...$$restProps}
  on:click
  transition:scale={{ duration: transition ? 200 : 0 }}
>
  <slot>
    {@html `<svg width="18px" height="18px" viewBox="0 0 426.66667 426.66667"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" /></svg>`}
  </slot>
</span>

<style lang="scss" global>
  .resp-fab {
    cursor: pointer;
    position: fixed;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    bottom: 1rem;
    right: 1rem;
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    z-index: 50;
  }
</style>
