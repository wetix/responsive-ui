<script lang="ts">
  let className = "";
  export { className as class };
  export let compact = false;
</script>

<div
  {...$$restProps}
  class="resp-card {className}"
  class:resp-card--compact={compact}
  on:click
>
  <slot />
</div>

<style lang="scss">
  .resp-card {
    padding: 15px;
    word-break: break-word;
    overflow: hidden;
    font-family: inherit;
    font-size: inherit;
    margin-bottom: var(--margin-bottom);
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);

    &--compact {
      padding: 0;
    }
  }
</style>
