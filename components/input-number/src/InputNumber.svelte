<script context="module" lang="ts">
  export const toFixedTrunc = (x: number, n: number) => {
    const v = `${x}`.split(".");
    if (n <= 0) return v[0];
    let f = v[1] || "";
    if (f.length > n) return `${v[0]}.${f.substr(0, n)}`;
    while (f.length < n) f += "0";
    return `${v[0]}.${f}`;
  };
</script>

<script lang="ts">
  export let id = "";
  let className = "";
  export { className as class };
  export let ref: HTMLInputElement;
  export let textDirection: "ltr" | "rtl" = "ltr";
  export let bordered = true;
  export let precision = 2;
  // export let min = 0;
  // export let max = 100;
  export let parser = (v: string): number => Number(v);
  export let format = (v: number): string => toFixedTrunc(v, precision);
  export let value = 0;

  let focused = false;

  const handleBlur = (e: Event) => {
    focused = false;
    const v = (e.currentTarget as HTMLInputElement).value.trim();
    // if (v === "") {
    //   (<HTMLInputElement>ref).value = "";
    //   return;
    // }
    const num = parser(v);
    if (isNaN(num)) return;
    // if (num <= min) return;
    // if (num >= max) return;
    value = num;
    ref.value = format(num);
  };
</script>

<div
  {id}
  class="resp-input-number resp-input-number--text-direction-{textDirection} {className}"
  class:resp-input-number--bordered={bordered}
  class:resp-input-number--focused={focused}
  on:click|stopPropagation={() => (focused = true)}
>
  {#if $$slots.prefix}
    <span class="resp-input-number__prefix"><slot name="prefix" /></span>
  {/if}
  <input
    bind:this={ref}
    type="text"
    pattern="\d*"
    on:blur={handleBlur}
    on:focus
    on:blur
    on:change
    on:input
    {...$$restProps}
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
    height: var(--input-height, 32px);
    line-height: 1;
    padding: 0 8px;
    box-sizing: border-box;
    border-radius: 3px;
    align-items: center;
    transition: all 0.5s;

    &--text-direction {
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
