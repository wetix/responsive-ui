<script lang="ts">
  import type { Device } from "../types";

  let className = "";
  export { className as class };
  export let span: number | Device = 24;
  export let justify = "center";

  let cls = `resp-col--${span}`;
  if (isNaN(Number(span))) {
    cls = Object.entries(<Device>span)
      .map(([k, v]) => `resp-col--${k}-${v}`)
      .join(" ");
  }
</script>

<div class={`resp-col--${justify} ${cls} ${className}`} {...$$restProps}>
  <slot />
</div>

<style lang="scss" global>
  .resp-col {
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

    &--1 {
      $width: 4.16666667%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--2 {
      $width: 8.33333333%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--3 {
      $width: 12.5%;
      flex: 0 0 $width;
      max-width: $width;
    }
    &--4 {
      $width: 16.66666667%;
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

  @media (max-width: 480px) {
    .resp-col {
      &--sm-1 {
        $width: 4.16666667%;
        flex: 0 0 $width;
        max-width: $width;
      }
      &--sm-2 {
        $width: 8.33333333%;
        flex: 0 0 $width;
        max-width: $width;
      }
      &--sm-3 {
        $width: 12.5%;
        flex: 0 0 $width;
        max-width: $width;
      }
      &--sm-4 {
        $width: 16.66666667%;
        flex: 0 0 $width !important;
        max-width: $width;
      }
      &--sm-5 {
        $width: 20.83333333%;
        flex: 0 0 $width;
        max-width: $width;
      }
      &--sm-6 {
        $width: 25%;
        flex: 0 0 $width;
        max-width: $width;
      }
      &--sm-20 {
        $width: 83.33333333%;
        flex: 0 0 $width;
        max-width: $width;
      }
    }
  }

  @media (min-width: 700px) {
  }
  @media (min-width: 1200px) {
  }
</style>
