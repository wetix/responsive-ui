<script lang="ts">
  let className = "";
  export { className as class };
  export let ref: null | HTMLInputElement = null;
  export let name = "";
  export let precision = 2;
  export let min = 0;
  export let max = 100;
  export let readonly = false;
  export let disabled = false;
  export let placeholder = "";
  export let parser = (v: string): number => parseFloat(v);
  export let format = (v: number): string => v.toPrecision(precision);
  export let value = 0;

  const onBlur = (e: Event) => {
    const v = (e.currentTarget as HTMLInputElement).value.trim();
    if (v === "") {
      (<HTMLInputElement>ref).value = "";
      return;
    }

    let num = parser(v);
    if (num < min) num = min;
    else if (num > max) num = max;
    value = num;
    (<HTMLInputElement>ref).value = format(num);
  };
</script>

<input
  {...$$restProps}
  class="responsive-ui-input-number {className}"
  bind:this={ref}
  value={format(value)}
  {name}
  type="text"
  pattern="\d*"
  {placeholder}
  {disabled}
  {readonly}
  on:blur={onBlur}
  on:blur
  on:change
  on:input
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
