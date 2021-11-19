<script lang="ts">
  let className = "";
  export { className as class };
</script>

<div class="resp-row {className}" {...$$restProps}>
  <slot />
</div>

<style lang="scss">
  .resp-row {
    display: flex;
    flex-direction: row;
    row-gap: 0;
  }
</style>
