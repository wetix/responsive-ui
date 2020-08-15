<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const onScroll = () => {};
</script>

<style lang="scss">
  .infinite-wrapper {
    display: block;
    overflow: hidden;
    overflow-y: auto;
    min-height: 100%;
  }
</style>

<div class="infinite-wrapper" on:scroll={onScroll}>
  <slot />
</div>
