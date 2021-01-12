<script lang="ts">
  let className = "";
  export { className as class };
  export let title = "";
  export let name = "";
  export let type = "button";
  export let outline = false;
  export let disabled = false;
  export let form = "";
  export let style = "";
</script>

<style lang="scss">
  .responsive-ui-button {
    cursor: pointer;
    display: block;
    color: #fff;
    border: none;
    outline: none;
    font-size: var(--font-size, 14px);
    border: 1px solid var(--primary-color, #fc4451);
    background: var(--primary-color, #fc4451);
    width: 100%;
    padding: 0 10px;
    margin: 0;
    height: 45px;
    text-align: center;
    text-transform: capitalize;
    transition: opacity 0.3s;
    border-radius: 5px;

    &__disabled {
      cursor: not-allowed !important;
      opacity: 0.5;
    }

    &__outline {
      background: none;
      color: var(--primary-text-color, #fc4451);
    }
  }
</style>

<button
  class="responsive-ui-button {className}"
  class:responsive-ui-button__disabled={disabled}
  class:responsive-ui-button__outline={outline}
  {name}
  {type}
  {disabled}
  {form}
  {style}
  on:click>
  <slot>{title}</slot>
</button>
