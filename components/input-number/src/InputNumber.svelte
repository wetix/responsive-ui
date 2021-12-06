<script lang="ts">
  let className = "";
  export { className as class };
  export let ref: null | HTMLInputElement = null;
  export let precision = 2;
  export let min = 0;
  export let max = 100;
  export let parser = (v: string): number => parseFloat(v);
  export let format = (v: number): string => v.toPrecision(precision);
  export let value = 0;

  const handleBlur = (e: Event) => {
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
  class="resp-input-number {className}"
  bind:this={ref}
  value={format(value)}
  type="text"
  pattern="\d*"
  on:blur={handleBlur}
  on:blur
  on:change
  on:input
/>

<style lang="scss" global>
  .resp-input-number {
    display: block;
    margin: 0;
    color: #1a1b1c;
    background: #f1f1f1;
    font-size: var(--font-size);
    font-family: var(--font-family);
    outline: none;
    appearance: none;
    user-select: text;
    padding: 0 10px;
    box-sizing: border-box;
    height: var(--input-height, 30px);
    line-height: 1;
    border: 1px solid #f1f1f1;
    border-radius: var(--border-radius, 5px);
  }
</style>
