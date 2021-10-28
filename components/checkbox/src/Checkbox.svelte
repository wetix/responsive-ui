<script lang="ts">
  let className = "";
  export { className as class };
  export let ref: null | HTMLInputElement = null;
  export let label = "";
  export let value = "";
  export let disabled = false;
  export let checked = false;
</script>

<label class="resp-checkbox {className}">
  <input
    {...$$restProps}
    bind:this={ref}
    type="checkbox"
    on:change
    {disabled}
    {value}
    bind:checked
    style="display: none"
  />
  <span>
    <svg viewBox="0 0 12 9" width="10px" height="9px">
      <polyline points="1 5 4 8 11 1" />
    </svg>
  </span><span>
    <slot>{label}</slot>
  </span>
</label>

<style lang="scss">
  $primary: #3c53c7;
  $gray: #b9b8c3;

  .resp-checkbox {
    display: inline-block;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;

    span {
      display: inline-block;
      vertical-align: middle;

      &:nth-child(2) {
        position: relative;
        width: 19px;
        height: 19px;
        border-radius: 50%;
        vertical-align: middle;
        border: 1px solid $gray;
        transition: all 0.2s ease;

        svg {
          position: absolute;
          z-index: 1;
          top: 5px;
          left: 4px;
          fill: none;
          stroke: white;
          stroke-width: 1.3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 16px;
          stroke-dashoffset: 16px;
          transition: all 0.3s ease;
          transition-delay: 0.1s;
          transform: translate3d(0, 0, 0);
        }
      }

      &:last-child {
        margin-left: 6px;

        &:after {
          content: "";
          position: absolute;
          top: 8px;
          left: 0;
          height: 1px;
          width: 100%;
          background: $gray;
          transform-origin: 0 0;
          transform: scaleX(0);
        }
      }

      &:hover span:first-child {
        border-color: $primary;
      }
    }

    input:checked + span {
      &:nth-child(2) {
        border-color: var(--primary-color, #fc4451);
        background: var(--primary-color, #fc4451);
      }
      svg {
        stroke-dashoffset: 0;
      }
    }

    input:disabled + span {
      &:nth-child(2) {
        cursor: not-allowed;
        background: #dcdcdc;
      }
    }
  }
</style>
