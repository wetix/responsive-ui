<script lang="ts">
  let className = "";
  export { className as class };
  export let ref: HTMLInputElement;
  export let direction: "ltr" | "rtl" = "ltr";
  export let bordered = true;
  export let precision = 2;
  export let min = 0;
  export let max = 100;
  export let parser = (v: string): number => parseFloat(v);
  export let format = (v: number): string => v.toFixed(precision);
  export let value = 0;

  let focused = false;

  const handleBlur = (e: Event) => {
    focused = false;
    const v = (e.currentTarget as HTMLInputElement).value.trim();
    if (v === "") {
      (<HTMLInputElement>ref).value = "";
      return;
    }

    // console.log(v, Number(v), Number(v).toFixed(2), Number(v).toPrecision(2));
    let num = parseFloat(v);
    if (num < min) num = min;
    if (num > max) num = max;
    value = num;
    console.log(typeof num, num < min, num > max, value, num);
    // (<HTMLInputElement>ref).value = format(num);
  };

  $: formattedValue = format(value);
</script>

<div
  class="resp-input-number resp-input-number--direction-{direction} {className}"
  class:resp-input-number--bordered={bordered}
  class:resp-input-number--focused={focused}
  on:click|stopPropagation={() => (focused = true)}
>
  {#if $$slots.prefix}
    <span class="resp-input-number__prefix"><slot name="prefix" /></span>
  {/if}
  <input
    {...$$restProps}
    bind:this={ref}
    value={formattedValue}
    type="text"
    pattern="\d*"
    on:blur={handleBlur}
    on:focus
    on:blur
    on:change
    on:input
  />
  {#if $$slots.suffix}
    <span class="resp-input-number__suffix"><slot name="suffix" /></span>
  {/if}
</div>

<style lang="scss" global>
  .resp-input-number {
    display: inline-flex;
    border: 1px solid transparent;
    color: var(--text-color, #1a1b1c);
    background: #fff;
    height: var(--input-height, 30px);
    line-height: 1;
    padding: 0 8px;
    box-sizing: border-box;
    border-radius: 3px;
    align-items: center;
    transition: all 0.5s;

    &--direction {
      &-rtl input {
        text-align: right;
      }
    }

    &__prefix {
      margin-right: 8px;
    }

    &__suffix {
      margin-left: 8px;
    }

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
