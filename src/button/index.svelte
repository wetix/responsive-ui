<script lang="ts">
  export let title = "";
  export let name = "";
  export let type = "button";
  export let disabled = false;
  export let secondary = false;
  export let style = "";
</script>

<style lang="scss">
  .ditto-button {
    cursor: pointer;
    display: block;
    color: #fff;
    border: none;
    outline: none;
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

    &.secondary {
      border: 1px solid var(--secondary-color, #505050);
      color: var(--secondary-color, #505050);
      background: #fff;
    }

    &.disabled {
      cursor: not-allowed !important;
      opacity: 0.5;
    }

    /* dark mode */
    @media (prefers-color-scheme: dark) {
      &.secondary {
        border: 1px solid var(--primary-color, #fc4451);
        background: #fff;
        color: var(--primary-color, #fc4451);
      }
    }
  }
</style>

<button
  class="ditto-button"
  class:disabled
  class:secondary
  {name}
  {type}
  {disabled}
  on:click
  {style}>
  <slot>{title || ''}</slot>
</button>
