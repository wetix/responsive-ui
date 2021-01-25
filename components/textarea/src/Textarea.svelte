<script lang="ts">
  export let ref: null | HTMLTextAreaElement = null;
  export let name = "";
  export let form = "";
  export let readonly = false;
  export let disabled = false;
  export let placeholder = "";
  export let cols = 80;
  export let rows = 4;
  export let maxlength = 100;
  export let value = "";
  export let autosize = true;

  const onChange = (e: Event) => {
    value = (e.target as HTMLTextAreaElement).value;
    if (autosize) {
      ref.style.height = "auto";
      ref.style.height = ref.scrollHeight + "px";
    }
  };
</script>

<textarea
  class="responsive-ui-textarea"
  bind:this={ref}
  {name}
  {form}
  {rows}
  {cols}
  {disabled}
  {placeholder}
  {value}
  {readonly}
  {maxlength}
  on:blur
  on:change
  on:change={onChange}
  on:input
/>

<style lang="scss">
  .responsive-ui-textarea {
    width: 100%;
    font-size: var(--font-size, 14px);
    font-family: var(--font-family, inherit);
    color: #1a1b1c;
    background: #f1f1f1;
    border: none;
    outline: 0;
    resize: none;
    border-radius: var(--border-radius, 5px);
    padding: 10px;
    margin: 0;
    transition: all 0.5s;

    &:hover {
      border: none;
    }
  }
</style>
