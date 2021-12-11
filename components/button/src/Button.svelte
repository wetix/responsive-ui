<script lang="ts">
  let className = "";
  export { className as class };
  export let ref: HTMLButtonElement;
  export let variant = "default";
  export let type = "submit";
  export let label = "";
  export let outline = false;
</script>

<button
  class="resp-button resp-button--{variant} {className}"
  class:resp-button--outline={outline}
  {type}
  {...$$restProps}
  role="button"
  bind:this={ref}
  on:click
>
  <slot>{label}</slot>
</button>

<style lang="scss" global>
  $sm: 576px;

  .resp-button {
    cursor: pointer;
    display: inline-flex;
    border: none;
    outline: 0;
    appearance: none;
    font-family: inherit;
    align-items: center;
    justify-content: center;
    min-width: 65px;
    font-size: var(--font-size, 14px);
    border: 1px solid #dcdcdc;
    background: #fff;
    padding: 0 15px;
    margin: 0;
    height: 42px;
    width: 100%;
    line-height: 1.5;
    text-align: center;
    text-transform: capitalize;
    transition: opacity 0.3s;
    border-radius: var(--border-radius, 5px);

    @media (min-width: $sm) {
      height: 32px;
      width: auto;
    }

    &:hover {
      background: #f5f5f5;
    }

    &--sm {
      height: 24px;
    }

    &--lg {
      height: 36px;
    }

    &--primary {
      border-color: var(--primary-color, #fc4451);
      background: var(--primary-color, #fc4451);
      color: #fff;

      &:hover {
        background: rgba(255, 69, 82, 0.9);
        border-color: rgba(255, 69, 82, 0.9);
      }

      &:active {
        background: rgba(209, 54, 65, 1) !important;
        border-color: rgba(209, 54, 65, 1) !important;
      }
    }

    &--link {
      border: none;
    }

    &[disabled="disabled"],
    &:disabled {
      cursor: not-allowed !important;
      opacity: 0.5;
    }

    &--outline {
      background: none;
      color: var(--primary-text-color, #fc4451);
    }
  }
</style>
