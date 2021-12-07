<script lang="ts">
  let className = "";
  export { className as class };
  export let flex: null | number | string;
  export let xs: number = 24;
  export let sm: number;
  export let md: number;
  export let lg: number;
  export let xl: number;
  export let sl: number;

  const getClassName = (size: string, span: number) =>
    `resp-col--${size}-${span}`;

  const clsNames: string[] = [];
  if (xs) clsNames.push(getClassName("xs", xs));
  if (sm) clsNames.push(getClassName("sm", sm));
  if (md) clsNames.push(getClassName("md", md));
  if (lg) clsNames.push(getClassName("lg", lg));
  if (xl) clsNames.push(getClassName("xl", xl));
  if (sl) clsNames.push(getClassName("sl", sl));
</script>

<div
  class={`resp-col ${clsNames.join(" ")} ${className}`}
  style="flex: {flex}"
  {...$$restProps}
>
  <slot />
</div>

<style lang="scss" global>
  // https://css-tricks.com/snippets/sass/mixin-manage-breakpoints/
  @use "sass:math";

  $sm: 576px;
  $md: 768px;
  $lg: 992px;
  $xl: 1200px;
  $sl: 1400px;

  $breakpoints: (
    "sm": $sm,
    "md": $md,
    "lg": $lg,
    "xl": $xl,
    "sl": $sl,
  ) !default;

  /// Mixin to manage responsive breakpoints
  /// @param {String} $breakpoint - Breakpoint name
  /// @param {Number} $span - Span number
  /// @require $breakpoints
  @mixin responsive($breakpoint, $span) {
    // If the key exists in the map
    @if map-has-key($breakpoints, $breakpoint) {
      // Prints a media query based on the value
      @media (min-width: map-get($breakpoints, $breakpoint)) {
        &--#{$breakpoint}-#{$span} {
          $width: math.percentage(math.div(100, 24 * 100) * $span);
          flex: 0 0 $width;
          max-width: $width;
          @content;
        }
      }
    }

    // If the key doesn't exist in the map
    @else {
      @warn "Unfortunately, no value could be retrieved from `#{$breakpoint}`. "
        + "Available breakpoints are: #{map-keys($breakpoints)}.";
    }
  }

  .resp-col {
    position: relative;
    max-width: 100%;
    min-height: 1px;
    flex: 0 0 100%;
    box-sizing: border-box;
    word-break: break-word;

    @for $i from 1 through 24 {
      &--xs-#{$i} {
        $width: math.percentage(math.div(100, 24 * 100) * $i);
        flex: 0 0 $width;
        max-width: $width;
      }
    }

    @each $breakpoint, $width in $breakpoints {
      @for $i from 1 through 24 {
        @include responsive($breakpoint, $i);
      }
    }
  }
</style>
