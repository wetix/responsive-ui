<script lang="ts">
  let className = "";
  export { className as class };
  export let value = "";
</script>

<style lang="scss">
  .responsive-ui-tag {
    display: inline-block;
    font-size: 10px;
    border-radius: 5px;
    color: rgba(4, 120, 87, 1);
    background: rgba(167, 243, 208, 1);
    height: 20px;
    line-height: 20px;
    padding: 0 8px;
    overflow: hidden;

    &--red {
      color: rgba(185, 28, 28, 1);
      background: rgba(254, 202, 202, 1);
    }

    &--yellow {
      color: rgba(180, 83, 9, 1);
      background: rgba(253, 230, 138, 1);
    }

    &--grey {
      background: #f5f5f5;
      color: #adadad;
    }
  }
</style>

<span class="responsive-ui-tag {className}">
  <slot />
</span>
