<script lang="ts">
  let className = "";
  export { className as class };
  export let ref: null | HTMLButtonElement = null;
  export let label = "";
  export let type = "button";
  export let outline = false;
  export let disabled = false;

</script>

<button
  role="button"
  {...$$restProps}
  class="responsive-ui-button {className}"
  class:responsive-ui-button--outline={outline}
  {type}
  {disabled}
  bind:this={ref}
  on:click
>
  <slot>{label}</slot>
</button>

<style lang="scss">
  .responsive-ui-button {
    cursor: pointer;
    display: block;
    color: #fff;
    border: none;
    outline: none;
    appearance: none;
    font-size: var(--font-size, 14px);
    border: 1px solid var(--primary-color, #fc4451);
    background: var(--primary-color, #fc4451);
    width: 100%;
    padding: 0 10px;
    margin: 0;
    height: var(--height-lg, 45px);
    text-align: center;
    text-transform: capitalize;
    transition: opacity 0.3s;
    border-radius: var(--border-radius, 5px);

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
