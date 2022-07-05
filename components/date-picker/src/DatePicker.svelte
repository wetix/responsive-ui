<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { DatePickerDateChangeEvent } from "../types";
  import Calendar from "./Calendar.svelte";
  import { isValidDate, toDateString } from "./datetime";

  const today = new Date(toDateString(new Date()));
  const dateChangeEvent = "datechange";
  const duration = 150;
  const dateRegex = new RegExp("^(\\d{4})-(\\d{2})-(\\d{2})$");
  const dispatch = createEventDispatcher<{
    datechange: DatePickerDateChangeEvent;
    error: String;
  }>();

  let className = "";
  export { className as class };
  export let value = "";
  export let name = "";
  export let open = false;
  export let ref: HTMLInputElement;
  export let readonly = false;
  export let bordered = true;
  export let disabled = false;
  export let useNative = true;
  export let spanWidth = false;
  export let min: string;
  export let max: string;
  export let disabledDate = (_: Date) => false;
  // export let format = (v: Date) => v;

  let focused = false;
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  let matches = dateRegex.exec(value);
  let native = true;

  if (!useNative) {
    native = false;
  }

  if (matches) {
    const date = new Date(matches[0]);
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
  }

  const handleClickOutside = () => {
    focused = false;
    open = false;
  };

  const handleClear = () => {
    ref && ref.focus();
    focused = false;
    value = "";
    day = 0;
    dispatch(dateChangeEvent, { date: null, dateString: value });
    setTimeout(() => {
      open = false;
    }, duration);
  };

  const validateDate = (val: string): boolean => {
    if (!val) {
      handleClear();
      return false;
    }
    // test regex, disabled date, is valid
    if (!dateRegex.test(val)) return false;
    if (disabledDate(new Date(val))) return false;
    if (!isValidDate(val)) return false;

    return true;
  };

  const handleChange = (e: Event | string) => {
    let val = null;
    switch (typeof e) {
      case "string":
        val = <string>e;
        break;
      case "object":
        val = (<HTMLInputElement>(<Event>e).currentTarget).value;
        break;
    }
    if (validateDate(val)) {
      const date = new Date(val);
      year = date.getFullYear();
      month = date.getMonth();
      day = date.getDate();
      value = val;
      handleClickOutside();

      // FIXME: remove this in future since we dispatch using change event
      dispatch(dateChangeEvent, { date, dateString: val });

      setTimeout(() => {
        ref.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
      }, 0);
    } else {
      dispatch("error", "invalid date selected");
    }
  };

  const handleFocus = () => {
    focused = true;
    setTimeout(() => {
      open = true;
    }, duration);
  };

  const handleBlur = () => {
    if (!validateDate(value)) value = "";
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") open = !open;
  };
</script>

<svelte:window on:click={handleClickOutside} />

<div
  class={`resp-date-picker ${className}`}
  class:resp-date-picker--native={native}
  class:resp-date-picker--focused={focused}
  class:resp-date-picker--bordered={bordered}
  class:resp-date-picker--disabled={disabled}
  on:click|stopPropagation={handleFocus}
>
  <input
    bind:this={ref}
    type="date"
    {name}
    {disabled}
    size="20"
    {readonly}
    {min}
    {max}
    on:focus={handleFocus}
    on:blur={handleBlur}
    on:keydown={handleKeydown}
    on:input={handleChange}
    on:focus
    on:blur
    on:change
    {value}
    {...$$restProps}
    pattern="\d{4}-\d{2}-\d{2}"
  />
  <i class="resp-date-picker__icon-calendar" role="img" aria-label="calendar">
    {@html `<svg viewBox="64 64 896 896" data-icon="calendar" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z" /></svg>`}
  </i>
  {#if open}
    <i
      class="resp-date-picker__icon-close"
      role="button"
      on:click|stopPropagation={handleClear}
      >{@html `<svg viewBox="64 64 896 896" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" /></svg>`}
    </i>
  {/if}

  {#if open && !useNative}
    <div
      class="resp-date-picker__calendar"
      class:resp-date-picker__calendar-native={useNative}
    >
      <Calendar
        bind:day
        bind:month
        bind:year
        {disabledDate}
        {spanWidth}
        on:change={(v) => handleChange(v.detail)}
      />
    </div>
  {/if}
</div>

<style lang="scss">
  $sm: 576px;
  $md: 768px;

  .resp-date-picker {
    display: inline-flex;
    position: relative;
    padding: 0 8px;
    margin: 0;
    height: var(--input-height, 32px);
    width: 100%;
    border: 1px solid transparent;
    line-height: 1.5;
    background: #fff;
    align-items: center;
    box-sizing: border-box;
    border-radius: 3px;
    transition: all 0.5s;

    @media (min-width: $sm) {
      width: auto;
    }

    &--bordered {
      border-color: var(--input-border-color, #dcdcdc);
    }

    &--focused,
    &:hover {
      border-color: #fc4451;
    }

    &--focused {
      box-shadow: 0 0 0 3px rgba(252, 68, 81, 0.3);

      .resp-date-picker__icon-calendar {
        opacity: 0;
      }
    }

    &--disabled {
      background: #f7f7f7;
      cursor: not-allowed;
      pointer-events: none;
    }

    input[type="date"] {
      display: flex;
      flex: 1 0 0;
      cursor: inherit;
      font-family: inherit;
      background: inherit;
      margin: 0;
      padding: 0;
      outline: none;
      border: none;
      color: var(--text-color, #1a1b1c);

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button,
      &::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
      }

      @media screen and (max-width: $md) {
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button,
        &::-webkit-calendar-picker-indicator {
          display: block;
          -webkit-appearance: initial;
        }
      }
    }

    @media screen and (max-width: $md) {
      &__icon-calendar,
      &__icon-close {
        display: none;
      }
    }

    &--native {
      input[type="date"] {
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button,
        &::-webkit-calendar-picker-indicator {
          display: block;
          -webkit-appearance: initial;
        }
      }

      .resp-date-picker {
        &__icon-calendar,
        &__icon-close {
          display: none;
        }
      }
    }

    &__icon-close {
      position: absolute;
      top: 50%;
      right: 8px;
      color: #bebebe;
      line-height: 1;
      background: transparent;
      transform: translateY(-50%);
      cursor: pointer;
      transition: opacity 0.3s, color 0.3s;
      z-index: 1;
    }

    &__calendar {
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      border-radius: 5px;
      background: #fff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      z-index: 5;

      @media (max-width: $md) {
        display: none;
      }
    }
  }

  :global(svg) {
    display: block;
  }
</style>
