<script lang="ts">
  export let align = "";
</script>

<style lang="scss">
  .responsive-ui-row {
    display: flex;
    flex-wrap: wrap;
    margin: 6px 0;
  }
</style>

<div class="responsive-ui-row" style={`align-items:${align}`}>
  <slot />
</div>
