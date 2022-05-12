<script lang="ts">
  let className = "";
  export { className as class };
  export let caption = "";
  export let disabled = false;
  export let collapsed = false;

  const id = `accordion_${Math.floor(Math.random() * Date.now())}`;
</script>

<div class="resp-accordion {className}" {...$$restProps}>
  <input {id} type="checkbox" {disabled} checked={!collapsed} on:change />
  <label class="resp-accordion__label-content" for={id}>
    <div class="resp-accordion__label-content__wrapper">
      <div class="resp-accordion__label">
        <slot name="label">{caption}</slot>
      </div>
      <slot name="label-right" />
    </div>
  </label>
  <div class="resp-accordion__content">
    <div class="resp-accordion__content-box">
      <slot {collapsed} {disabled} />
    </div>
  </div>
</div>

<style lang="scss" global>
  .resp-accordion {
    position: relative;

    &__label-content {
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      color: #1a1b1c;
      padding: 0.65rem 0;
      padding-right: 28px;
      border-bottom: 1px solid #e1e1e1;
      font-weight: 600;

      &__wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      &:after {
        content: "";
        flex-shrink: 0;
        position: absolute;
        top: calc(50% - 4px);
        right: 10px;
        border: solid black;
        border-width: 0 1px 1px 0;
        display: inline-block;
        padding: 4px;
        transition: all 0.3s;
        transform-origin: center;
        transform: rotate(-45deg);
      }
    }

    &__content {
      height: 0;
      overflow: hidden;
      transition: all 0.5s;

      &-box {
        padding: 0.65rem 0;
      }
    }

    & > input {
      display: none;
    }

    & > input:checked ~ &__label-content:after {
      transform: rotate(45deg);
    }

    & > input:disabled ~ &__label-content {
      cursor: not-allowed;
      opacity: 0.5;
    }

    & > input:checked ~ &__content {
      height: auto;
      overflow: visible;
    }
  }
</style>
