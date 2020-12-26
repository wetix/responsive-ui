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

    &--24 {
      $width: 100;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--23 {
      $width: 95.83333333%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--22 {
      $width: 91.66666667%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--21 {
      $width: 87.5%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--20 {
      $width: 83.33333333%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--19 {
      $width: 79.16666667%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--18 {
      $width: 75%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--17 {
      $width: 70.83333333%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--16 {
      $width: 66.66666667%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--15 {
      $width: 62.49999999%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--12 {
      $width: 50%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--11 {
      $width: 45.83333333%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--10 {
      $width: 41.66666667%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--9 {
      $width: 37.5%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--8 {
      $width: 33.33333333%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--7 {
      $width: 29.16666667%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--6 {
      $width: 25%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--5 {
      $width: 20.83333333%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--4 {
      $width: 16.66666667%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--3 {
      $width: 12.5%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--2 {
      $width: 8.33333333%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--1 {
      $width: 4.16666667%;
      flex: 0 0 $width;
      max-width: $width;
    }

    &--center {
      justify-content: center;
    }

    &--right {
      justify-content: right;
    }
  }
</style>

<div
  class={`responsive-ui-column--${span} responsive-ui-column--${justify} ${className}`}
  {style}>
  <slot />
</div>
