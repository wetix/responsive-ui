<script lang="ts">
  let className = "";
  export { className as class };
  export let compact = false;
</script>

<style lang="scss">
  .responsive-ui-card {
    word-break: break-word;
    padding: 10px;
    margin-bottom: 15px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    overflow: hidden;

    &--compact {
      padding: 0;
    }
  }
</style>

<div
  class="responsive-ui-card {className}"
  class:responsive-ui-card--compact={compact}
  on:click>
  <slot />
</div>
