<script lang="ts">
  let className = "";
  export { className as class };
  export let ref: HTMLInputElement;
  export let name = "";
  export let disabled = false;
  export let checked = false;
  export let value = "";

  const id = `chip-${Math.floor(Math.random() * Date.now())}`;
</script>

<input
  bind:this={ref}
  {id}
  {name}
  {disabled}
  type="checkbox"
  bind:checked
  on:change
  on:click
/>
<label
  class="resp-chip {className}"
  class:resp-chip--disabled={disabled}
  data-value={value}
  for={id}
  {...$$restProps}
>
  <slot />
</label>

<style lang="scss" global>
  .resp-chip {
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    font-size: 10px;
    padding: 3px 8px;
    border-radius: 5px;
    color: #fc4451;
    border: 1px solid #fc4451;
    background: transparent;
    overflow: hidden;

    &--disabled {
      cursor: not-allowed;
      text-decoration: line-through;
    }
  }

  input[type="checkbox"] {
    display: none;
  }

  input:checked ~ .resp-chip {
    // border: 1px solid #fc4451;
    color: #fff;
    background: #fc4451;
  }
</style>
