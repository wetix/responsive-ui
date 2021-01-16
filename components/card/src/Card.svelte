<script lang="ts">
  let className = "";
  export { className as class };
  export let compact = false;
</script>

<div
  class="responsive-ui-card {className}"
  class:responsive-ui-card--compact={compact}
  on:click
>
  <slot />
</div>

<style lang="scss">
  .responsive-ui-card {
    padding: 10px;
    word-break: break-word;
    overflow: hidden;
    margin-bottom: 15px;
    border-radius: var(--border-radius, 5px);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);

    &--compact {
      padding: 0;
    }
  }
</style>
