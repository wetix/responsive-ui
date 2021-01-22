<script lang="ts">
  export let count = 100;
  export let source = [];
  export let max = 99;
</script>

<span
  class="notification-bell is-animating"
  data-count={count > max ? `${max}+` : count}>
  <slot>
    <svg width="42" height="40" viewBox="0 0 21 20">
      <g transform="translate(2, 0)">
        <path
          class="notification-bell__bow"
          d="M15,8.5 C15,5.43 12.86,2.86 10,2.18 L10,1.5 C10,0.671572875 9.32842712,0 8.5,0 C7.67157288,0 7,0.671572875 7,1.5 L7,2.18 C4.13,2.86 2,5.43 2,8.5 L2,14 L0,16 L0,17 L17,17 L17,16 L15,14 L15,8.5 Z"
        />
        <path
          class="notification-bell__clapper"
          d="M2.5,2 C2.64,2 2.77,2 2.9,1.96 C3.55,1.82 4.09,1.38 4.34,0.78 C4.44,0.54 4.5,0.27 4.5,0 L0.5,0 C0.5,1.1045695 1.3954305,2 2.5,2 L2.5,2 Z"
        />
      </g>
    </svg>
  </slot>
  <!-- <span class="responsive-ui-badge__bubble"
    >{count < max ? count : `${max}+`}</span
  > -->
</span>

<style lang="scss">
  // TEMPLATE SETUP
  @mixin flexbox-c-c {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  $color-white: #fff;
  $color-black: #000;

  $theme-material-light: (
    statusBar: #e0e0e0,
    appBar: #f5f5f5,
    appBackground: #fafafa,
    modalAndCard: #fff,
    textPrimary: rgba(#000, 0.87),
    textSecondary: rgba(#000, 0.54),
    textDisabledAndContext: rgba(#000, 0.38),
    dividers: rgba(#000, 0.12),
  );

  $theme-material-dark: (
    statusBar: #000,
    appBar: #212121,
    appBackground: #303030,
    modalAndCard: #424242,
    textPrimary: rgba(#fff, 1),
    textSecondary: rgba(#fff, 0.7),
    textDisabledAndContext: rgba(#fff, 0.5),
    dividers: rgba(#fff, 0.12),
  );

  $theme-app: (
    base: #00aa8d,
    lighter: #00bf92,
    darker: #008975,
  );

  @function theme-light($key) {
    @if map-has-key($theme-material-light, $key) {
      @return map-get($theme-material-light, $key);
    } @else {
      @warn "No such key in map";
    }
  }
  @function theme-dark($key) {
    @if map-has-key($theme-material-dark, $key) {
      @return map-get($theme-material-dark, $key);
    } @else {
      @warn "No such key in map";
    }
  }
  @mixin apply-child-themes($color, $properties...) {
    .t-material-light & {
      @each $property in $properties {
        #{$property}: theme-light($color);
      }
    }
    .t-material-dark & {
      @each $property in $properties {
        #{$property}: theme-dark($color);
      }
    }
  }
  @mixin hidden-visually() {
    border: 0 !important;
    clip: rect(0 0 0 0) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
  }
  @function theme-app($key) {
    @if map-has-key($theme-app, $key) {
      @return map-get($theme-app, $key);
    } @else {
      @warn "No such key in map";
    }
  }

  @keyframes ringing {
    0%,
    100% {
      transform: rotate(0);
    }

    20% {
      transform: rotate(10deg);
    }

    40%,
    80% {
      transform: rotate(-6deg);
    }

    60% {
      transform: rotate(6deg);
    }
  }

  @keyframes clapp {
    $_x: 6px;

    0%,
    100% {
      transform: translate($_x, 18px) rotate(0);
    }

    20% {
      transform: translate($_x + 4px, 18px) rotate(-10deg);
    }

    40% {
      transform: translate($_x - 4px, 18px) rotate(10deg);
    }

    60% {
      transform: translate($_x + 3px, 18px) rotate(-8deg);
    }

    80% {
      transform: translate($_x - 3px, 18px) rotate(8deg);
    }
  }

  // REACT COMPONENT
  .notification-bell {
    @include apply-child-themes(textDisabledAndContext, color);

    animation-timing-function: ease;
    cursor: pointer;
    transform-origin: 50% 0%;
    position: relative;
    transition: 200ms ease-in-out color;
    user-select: none;

    &:after {
      @include apply-child-themes(appBackground, "border-color");

      background-color: theme-app(lighter);
      border: 2px solid;
      border-radius: 11px;
      content: attr(data-count);
      color: $color-white;
      display: block;
      font-size: 10px;
      font-family: helvetica;
      height: 9px;
      line-height: 8px;
      min-width: 9px;
      padding: 4px;
      position: absolute;
      right: 0px;
      text-align: center;
      top: 3px;
      transition: 100ms ease-in-out all;
    }

    &[data-count="0"] {
      &:after {
        @include hidden-visually;
      }
    }

    &.is-muted {
      &:after {
        content: "";
        color: transparent;
        height: 2px;
        min-width: 0;
        padding: 2px;
        right: 4px;
        top: 4px;
        width: 2px;
      }
    }

    &:not([data-count="0"]) {
      @include apply-child-themes(textPrimary, color);

      &.is-muted {
        @include apply-child-themes(textSecondary, color);
      }
    }

    &:hover {
      @include apply-child-themes(textDisabledAndContext, color);

      &:after {
        background-color: theme-app(base);
      }
    }

    &.is-animating {
      animation: ringing 800ms infinite;

      .notification-bell__clapper {
        animation: clapp 800ms infinite;
      }
    }

    .notification-bell__bow,
    .notification-bell__clapper {
      fill: currentColor;
    }

    svg {
      overflow: visible !important; //override reset
    }
  }

  .notification-bell__clapper {
    animation-timing-function: inherit;
    transform: translate(6px, 18px) rotate(0);
    transform-origin: inherit;
  }
</style>
