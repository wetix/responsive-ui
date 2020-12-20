<script lang="ts">
  // import { current_component } from "svelte/internal";

  let className = "";
  export { className as class };
  export let title = "";
  export let name = "";
  export let type = "button";
  export let disabled = false;
  export let form = "";
  export let style = "";
  // export let secondary = false;
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

    &__disabled {
      cursor: not-allowed !important;
      opacity: 0.5;
    }

    // /* dark mode */
    // @media (prefers-color-scheme: dark) {
    //   &.secondary {
    //     border: 1px solid var(--primary-color, #fc4451);
    //     background: #fff;
    //     color: var(--primary-color, #fc4451);
    //   }
    // }
  }
</style>

<button
  class="ditto-button {className}"
  class:ditto-button__disabled={disabled}
  {name}
  {type}
  {disabled}
  {form}
  {style}
  on:click>
  {title || ''}
</button>
