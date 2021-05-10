<script lang="ts">
  let className = "";
  export { className as class };
  export let compact = false;
</script>

<div
  {...$$restProps}
  class="responsive-ui-card {className}"
  class:responsive-ui-card--compact={compact}
  on:click
>
  <slot />
</div>

<style lang="scss">
  .responsive-ui-card {
    padding: var(--padding);
    word-break: break-word;
    overflow: hidden;
    margin-bottom: var(--margin-bottom);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);

    &--compact {
      padding: 0;
    }
  }
</style>
