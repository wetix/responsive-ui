<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Calendar from "./Calendar.svelte";
  import { isValidDate, toDateString } from "./datetime";

  const today = new Date();
  const dispatch = createEventDispatcher<{
    change: { date: null | Date; dateString: string };
  }>();

  let className = "";
  export { className as class };
  export let placeholder = "Select date";
  export let value = "";
  export let name = "";
  export let ref: null | HTMLInputElement;
  export let readonly = false;
  export let size = "middle";
  export let bordered = true;
  export let disabled = false;
  export let format = (v: Date) => v;
  export let disabledDate = (v: Date) => today > v;

  let open = false;

  window.addEventListener("click", () => {
    focused = false;
    open = false;
  });

  let day = 1;
  let month = 1;
  let year = 2021;
  let clientHeight = 0;
  let focused = false;
  const duration = 150;
  // $: formatDate = format(value);

  const setDateOnlyIfValid = (value: string) => {
    if (!/^\d{4}\-\d{2}\-\d{2}$/.test(value)) return false;
    if (isValidDate(value)) {
      const date = new Date(value);
      year = date.getFullYear();
      month = date.getMonth();
      day = date.getDate();
      dispatch("change", { date, dateString: value });
      return true;
    }
    return false;
  };

  const handleSelectDate = (e: CustomEvent<Date>) => {
    const date = e.detail;
    value = toDateString(date);
    month = date.getMonth();
    day = date.getDate();
    year = date.getFullYear();
    dispatch("change", { date, dateString: value });
  };

  const handleChange = (e: Event) => {
    value = (<HTMLInputElement>e.currentTarget).value;
    setDateOnlyIfValid(value);
  };

  const handleFocus = () => {
    focused = true;
    setTimeout(() => {
      open = true;
    }, duration);
  };

  const handleBlur = () => {
    if (!setDateOnlyIfValid(value)) value = "";
  };

  const handleClear = () => {
    ref!!.focus();
    focused = false;
    value = "";
    day = 0;
    dispatch("change", { date: null, dateString: value });
    setTimeout(() => {
      open = false;
    }, duration);
  };
</script>

<div
  class="resp-date-picker resp-date-picker--{size} {className}"
  class:resp-date-picker--focused={focused}
  class:resp-date-picker--bordered={bordered}
  class:resp-date-picker--disabled={disabled}
  bind:clientHeight
  on:click|stopPropagation={handleFocus}
>
  <input
    bind:this={ref}
    type="text"
    {name}
    {disabled}
    on:focus={handleFocus}
    {placeholder}
    {readonly}
    on:input={handleChange}
    on:blur={handleBlur}
    size="20"
    autocomplete="off"
    {value}
  />
  <span
    class="resp-date-picker-calendar-icon"
    role="img"
    aria-label="calendar"
    on:click={() => (open = true)}
    ><svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="calendar"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      ><path
        d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"
      /></svg
    >
  </span>
  {#if open}
    <span
      class="resp-date-picker-close-icon"
      role="button"
      on:click|stopPropagation={handleClear}
    >
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="close-circle"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        ><path
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
        /></svg
      ></span
    >
  {/if}

  {#if open}
    <div class="resp-date-picker-calendar" style={`top:${clientHeight + 5}px`}>
      <Calendar
        bind:day
        bind:month
        bind:year
        {disabledDate}
        on:change={handleSelectDate}
      />
    </div>
  {/if}
</div>

<style lang="scss">
  .resp-date-picker {
    display: inline-flex;
    position: relative;
    padding: 0 8px;
    margin: 0;
    height: var(--input-height, 30px);
    line-height: var(--input-height, 30px);
    background: #fff;
    align-items: center;
    box-sizing: border-box;
    border-radius: 3px;
    transition: all 0.5s;

    &--bordered {
      border: 1px solid #dcdcdc;
    }

    &--focused,
    &:hover {
      border-color: #fc4451;
    }

    &--focused {
      box-shadow: 0 0 0 3px rgba(252, 68, 81, 0.3);

      .resp-date-picker-calendar-icon {
        opacity: 0;
      }
    }

    &--disabled {
      background: #f7f7f7;
      cursor: not-allowed;
      pointer-events: none;
    }

    &--small {
      height: 24px;
      line-height: 24px;
    }

    &--big {
      height: 36px;
      line-height: 36px;
    }

    input[type="text"] {
      cursor: inherit;
      font-family: inherit;
      display: inline-block;
      background: inherit;
      margin: 0;
      padding: 0;
      outline: none;
      border: none;
      flex: auto;
      color: var(--text-color, #1a1b1c);
    }

    &-close-icon {
      position: absolute;
      top: 50%;
      right: 8px;
      color: #bebebe;
      line-height: 1;
      background: transparent;
      transform: translateY(-50%);
      cursor: pointer;
      // opacity: 0;
      transition: opacity 0.3s, color 0.3s;
      z-index: 1;
    }

    &-calendar {
      position: absolute;
      border-radius: 4px;
      background: #fff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      left: 0;
      z-index: 5;
    }
  }
</style>
