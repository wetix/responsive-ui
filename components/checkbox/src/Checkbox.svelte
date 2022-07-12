<script lang="ts">
  let className = "";
  export { className as class };
  export let ref: HTMLInputElement;
  export let name = "";
  export let disabled = false;
  export let value = "";
  export let checked = false;
</script>

<label class="resp-checkbox {className}" {...$$restProps}>
  <input
    {name}
    {disabled}
    bind:this={ref}
    bind:checked
    type="checkbox"
    {value}
    on:change
    style="display: none;"
    data-testid="checkbox"
  />
  <span class="resp-checkbox__action">
    <i class="resp-checkbox__icon">
      {@html `<svg viewBox="0 0 12 9" width="10px" height="10px"><polyline points="1 5 4 8 11 1" /></svg>`}
    </i>
  </span><span class="resp-checkbox__label">
    <slot />
  </span>
</label>

<style lang="scss" global>
  .resp-checkbox {
    display: flex;
    user-select: none;

    &__icon {
      cursor: pointer;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      width: 19px;
      height: 19px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid var(--input-border-color, #dcdcdc);
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

      &:hover {
        border-color: var(--primary-color, #fc4451);
      }
    }

    &__label {
      cursor: pointer;
    }

    &__action {
      margin-right: 10px;
    }

    input:checked + &__action {
      .resp-checkbox__icon {
        border-color: var(--primary-color, #fc4451);
        background: var(--primary-color, #fc4451);
      }
      svg {
        stroke-dashoffset: 0;
      }
    }

    input:checked ~ &__label {
      text-decoration: line-through;
    }

    input:disabled {
      & ~ .resp-checkbox__action {
        .resp-checkbox__icon {
          cursor: not-allowed;
          border-color: #bebebe;
          background: #dcdcdc;
        }
      }
      & ~ .resp-checkbox__label {
        cursor: not-allowed;
      }
    }
  }
</style>
