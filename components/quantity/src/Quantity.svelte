<script lang="ts">
  import { onMount } from "svelte";
  import { noop } from "svelte/internal";

  let className = "";
  export { className as class };
  export let ref: HTMLInputElement;
  export let min = 0;
  export let max = 10;
  export let step = 1;
  export let value = 0;
  export let autofocus = false;
  export let disabled = false;
  export let style = "";

  const readjustValue = (v: number = value) => {
    let newValue = v;
    if (v < min) newValue = min;
    else if (v > max) newValue = max;
    value = newValue;
  };

  readjustValue();

  let slim = false;
  let focused = false;

  onMount(() => {
    if (autofocus) ref.focus();
    slim = true;
  });

  $: minLimit = value <= min;
  $: maxLimit = value >= max;

  const dispatchChange = (el: HTMLElement) => {
    setTimeout(() => {
      el.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
    }, 0);
  };

  const handleDecrement = () => {
    if (minLimit) return;
    value += -step;
    ref.stepDown(step);
    dispatchChange(ref);
  };

  const handleIncrement = () => {
    if (maxLimit) return;
    value += step;
    ref.stepUp(step);
    dispatchChange(ref);
  };

  const handleKeypress = (e: KeyboardEvent) => {
    const charCode = e.which || e.keyCode;
    // prevent if user type non-numeric value
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) || charCode == 190) {
      e.preventDefault();
      return;
    }
  };

  // because change always execute before blur, we need to readjust it when onblur
  const handleChange = (e: Event) => {
    const v = (e.currentTarget as HTMLInputElement).valueAsNumber;
    if (isNaN(v)) value = min;
    else readjustValue(v);
  };

  const handleBlur = () => {
    focused = false;
  };
</script>

<span
  class="resp-quantity {className}"
  class:resp-quantity--slim={slim}
  class:resp-quantity--focused={focused}
  class:resp-quantity--disabled={disabled}
  on:click|stopPropagation={() => (focused = true)}
  {style}
>
  {#if slim}
    <i
      class="resp-quantity__control"
      class:resp-quantity__control--limit={minLimit}
      on:click={!disabled ? handleDecrement : noop}
    >
      {@html `<svg width="1em" height="1em" viewBox="0 0 31.427 31.427">
        <path d="M1.111 16.832A1.117 1.117 0 010 15.706c0-.619.492-1.111 1.111-1.111H30.3c.619 0 1.127.492 1.127 1.111s-.508 1.127-1.127 1.127H1.111z" />
      </svg>`}
    </i>
  {/if}
  <input
    bind:this={ref}
    type="number"
    {min}
    {max}
    {step}
    {disabled}
    on:keypress={handleKeypress}
    on:blur={handleBlur}
    on:change={handleChange}
    on:change
    on:input
    bind:value
    {...$$restProps}
  />
  {#if slim}
    <i
      class="resp-quantity__control"
      class:resp-quantity__control--limit={maxLimit}
      on:click={!disabled ? handleIncrement : noop}
    >
      {@html `<svg width="1em" height="1em" viewBox="0 0 31.444 31.444">
        <path d="M1.119 16.841a1.118 1.118 0 01-1.111-1.127c0-.619.492-1.111 1.111-1.111h13.475V1.127A1.133 1.133 0 0115.722 0c.619 0 1.111.508 1.111 1.127v13.476h13.475c.619 0 1.127.492 1.127 1.111s-.508 1.127-1.127 1.127H16.833v13.476c0 .619-.492 1.127-1.111 1.127a1.131 1.131 0 01-1.127-1.127V16.841H1.119z" />
      </svg>`}
    </i>
  {/if}
</span>

<style lang="scss" global>
  .resp-quantity {
    display: inline-flex;
    align-items: center;
    padding-right: 5px;
    border: 1px solid var(--input-border-color, #dcdcdc);
    border-radius: 3px;
    transition: all 0.5s;

    svg {
      fill: #505050;
    }

    &__control {
      cursor: pointer;
      display: inline-flex;

      &--limit svg {
        fill: #ababab;
      }
    }

    /* Firefox */
    & > input[type="number"] {
      cursor: inherit;
      border: none;
      margin: 0;
      padding: 0 5px;
      background: inherit;
      outline: none;
      appearance: textfield;
      height: var(--input-height, 32px);
      color: var(--theme-color);
      text-align: center;
      width: 100%;
      min-width: 65px;
      border-radius: inherit;
    }

    &--slim {
      border-color: transparent !important;
      padding: 0 5px;

      input[type="number"] {
        width: 1rem;

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          opacity: 0;
          display: none;
        }
      }
    }

    &--focused,
    &:hover {
      border-color: #fc4451;
    }

    &--focused {
      border-color: #fc4451;
      box-shadow: 0 0 0 3px rgba(252, 68, 81, 0.3);
    }

    &--disabled {
      cursor: not-allowed;
    }
  }
</style>
