<script lang="ts">
  let className = "";
  export { className as class };
  export let variant = "default";
  export let size = "medium";
  export let ref: null | HTMLButtonElement = null;
  export let label = "";
  export let type = "button";
  export let outline = false;
  export let disabled = false;
</script>

<button
  {...$$restProps}
  class="resp-button resp-button--{variant} resp-button--{size} {className}"
  class:resp-button--outline={outline}
  role="button"
  {type}
  {disabled}
  bind:this={ref}
  on:click
>
  <slot>{label}</slot>
</button>

<style lang="scss">
  .resp-button {
    cursor: pointer;
    display: inline-block;
    border: none;
    outline: none;
    appearance: none;
    font-family: inherit;
    min-width: 65px;
    font-size: var(--font-size, 14px);
    border: 1px solid #dcdcdc;
    background: #fff;
    padding: 0 12px;
    margin: 0;
    height: var(--input-height, 30px);
    line-height: var(--input-height, 30px);
    text-align: center;
    text-transform: capitalize;
    transition: opacity 0.3s;
    border-radius: var(--border-radius, 5px);

    &--small {
      height: 24px;
      line-height: 24px;
    }

    &--primary {
      border-color: var(--primary-color, #fc4451);
      background: var(--primary-color, #fc4451);
      color: #fff;
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

    @media screen and (max-width: 640px) {
      width: 100%;
    }
  }
</style>
