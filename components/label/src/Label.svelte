<script lang="ts">
  export let title = "";
  export let style = "";
</script>

<style lang="scss">
  .responsive-ui-label {
    display: block;
    padding: 6px 0;

    &__title {
      // color: #b9b9b9;
      color: #3b3b3b;
      margin-bottom: 8px;
    }
  }
</style>

<div class="responsive-ui-label" {style}>
  <div class="responsive-ui-label__title">{title}</div>
  <slot />
</div>
