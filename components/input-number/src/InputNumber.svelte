<script lang="ts">
  let className = "";
  export { className as class };
  export let ref: null | HTMLInputElement = null;
  export let name = "";
  export let min = 0;
  export let max = 100;
  export let readonly = false;
  export let disabled = false;
  export let placeholder = "";
  export let parser = (v: string): number => parseFloat(v);
  export let format = (v: number): string => v.toString();
  export let value = 0;

  const handleInput = (e: Event) => {
    const v = (e.target as HTMLInputElement).value.trim();
    if (v) {
      let num = parser(v);
      if (num < min) {
        e.preventDefault();
        num = min;
      }
      if (num > max) {
        e.preventDefault();
        num = max;
      }
      value = num;
      console.log(num);
    }
  };

  $: strValue = format(value);
</script>

<input
  class="responsive-ui-input-number {className}"
  {name}
  type="text"
  pattern="\d*"
  {placeholder}
  {disabled}
  {readonly}
  value={strValue}
  bind:this={ref}
  {...$$restProps}
  on:input={handleInput}
/>

<style lang="scss">
  .responsive-ui-input-number {
    display: block;
    margin: 0;
    color: #1a1b1c;
    background: #f1f1f1;
    font-size: var(--font-size, 14px);
    font-family: var(--font-family, inherit);
    outline: none;
    appearance: none;
    width: 100%;
    user-select: text;
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    padding: 0 10px;
    box-sizing: border-box;
    height: var(--height, 34px);
    line-height: var(--height, 34px);
    border: 1px solid #f1f1f1;
    border-radius: var(--border-radius, 5px);
  }
</style>
