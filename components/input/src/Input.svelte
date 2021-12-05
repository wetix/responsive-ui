<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let ref: null | HTMLInputElement = null;
  export let variant = "medium";
  export let type = "text";
  export let bordered = true;
  export let value = "";

  let focused = false;
  const onKeyup = (e: KeyboardEvent) => {
    const v = (<HTMLInputElement>e.target).value;
    const key = e.key || e.keyCode;
    value = v;

    // when user click enter
    if (key === "Enter" || key === 13) {
      dispatch("enter", value);
    }
  };
</script>

<div
  class="resp-input resp-input--{variant} {className}"
  class:resp-input--bordered={bordered}
  class:resp-input--focused={focused}
  on:click|stopPropagation={() => (focused = true)}
>
  <slot name="prefix" />
  <input
    bind:this={ref}
    {type}
    {value}
    on:blur={() => (focused = false)}
    on:keyup={onKeyup}
    on:input
    on:change
    {...$$restProps}
  />
  <slot name="suffix" />
</div>

<style lang="scss" global>
  .resp-input {
    display: inline-flex;
    color: var(--text-color, #1a1b1c);
    background: #fff;
    height: var(--input-height, 30px);
    line-height: var(--input-height, 30px);
    padding: 0 8px;
    box-sizing: border-box;
    border-radius: 3px;
    transition: all 0.5s;

    input {
      cursor: inherit;
      font-family: inherit;
      display: inline-block;
      background: inherit;
      margin: 0;
      padding: 0;
      outline: none;
      border: none;
      flex: auto;
    }

    &--small {
      height: var(--input-height-sm, 24px);
      line-height: var(--input-height-sm, 24px);
    }

    &--large {
      min-width: 240px;
      height: var(--input-height-lg, 42px);
      line-height: var(--input-height-lg, 42px);
    }

    &--bordered {
      border: 1px solid #f1f1f1;
    }

    &--focused,
    &:hover {
      border-color: #fc4451;
    }

    &--focused {
      border-color: #fc4451;
      box-shadow: 0 0 0 3px rgba(252, 68, 81, 0.3);
    }
  }
</style>
