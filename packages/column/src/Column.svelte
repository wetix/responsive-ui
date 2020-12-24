<script lang="ts">
  let className = "";
  export { className as class };
  export let span = 24;
  export let style = "";
  export let justify = "center";
</script>

<style lang="scss">
  .responsive-ui-column {
    position: relative;
    max-width: 100%;
    min-height: 1px;
    width: 100%;
    box-sizing: border-box;
    word-break: break-word;

    &--col-24 {
      $width: 100;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-23 {
      $width: 95.83333333%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-15 {
      $width: 62.49999999%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-12 {
      $width: 50%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-11 {
      $width: 45.83333333%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-10 {
      $width: 41.66666667%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-9 {
      $width: 37.5%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-8 {
      $width: 33.33333333%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-7 {
      $width: 29.16666667%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-6 {
      $width: 25%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-5 {
      $width: 20.83333333%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-4 {
      $width: 16.66666667%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-3 {
      $width: 12.5%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-2 {
      $width: 8.33333333%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--col-1 {
      $width: 4.16666667%;
      flex: 0 0 $width;
      max-width: $width;
    }

    &.right {
      text-align: right;
    }
  }
</style>

<div class={`responsive-ui-column--${span} ${justify} ${className}`} {style}>
  <slot />
</div>
