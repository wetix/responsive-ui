<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let ref: HTMLInputElement;
  export let type = "text";
  export let bordered = true;
  export let value = "";

  let focused = false;
  const handleKeyup = (e: KeyboardEvent) => {
    const v = (<HTMLInputElement>e.target).value;
    value = v;

    // when user click enter
    if (e.key === "Enter") {
      dispatch("enter", value);
    }
  };
</script>

<div
  class="resp-input {className}"
  class:resp-input--bordered={bordered}
  class:resp-input--focused={focused}
  on:click|stopPropagation={() => (focused = true)}
>
  <slot name="prefix" />
  <input
    bind:this={ref}
    {type}
    {value}
    on:keyup={handleKeyup}
    on:blur={() => (focused = false)}
    on:focus
    on:blur
    on:input
    on:change
    {...$$restProps}
  />
  <slot name="suffix" />
</div>

<style lang="scss" global>
  .resp-input {
    display: inline-flex;
    border: 1px solid transparent;
    color: var(--text-color, #1a1b1c);
    background: #fff;
    height: var(--input-height, 32px);
    line-height: 1;
    padding: 0 8px;
    box-sizing: border-box;
    border-radius: 3px;
    align-items: center;
    transition: all 0.5s;

    input {
      cursor: inherit;
      font-family: inherit;
      display: inline-block;
      background: inherit;
      width: inherit;
      margin: 0;
      padding: 0;
      outline: none;
      border: none;
      flex: auto;

      &:-webkit-autofill,
      &:-webkit-autofill:focus {
        transition: background-color 600000s 0s, color 600000s 0s;
      }
    }

    &--bordered {
      border-color: var(--input-border-color, #dcdcdc);
    }

    &--focused,
    &:hover {
      border-color: #fc4451;
    }

    &--focused {
      border-color: #fc4451;
      box-shadow: 0 0 0 3px rgba(252, 68, 81, 0.3);
    }

    @media (max-width: 576px) {
      width: 100%;
    }
  }
</style>
