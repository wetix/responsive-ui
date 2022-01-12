<script lang="ts">
  import Calendar from "./Calendar.svelte";
  import { toDateString } from "./datetime";

  let className = "";
  export { className as class };
  export let value: [Date, Date] = [new Date(), new Date()];
  export let focused = false;
  export let placeholder: [string, string] = ["", ""];
  export let disabled = false;
  export let bordered = false;

  const handleFocus = () => {
    focused = true;
  };
</script>

<div
  class="resp-date-range-picker {className}"
  class:resp-date-range-picker--focused={focused}
  class:resp-date-range-picker--bordered={bordered}
  class:resp-date-range-picker--disabled={disabled}
  on:click|stopPropagation={handleFocus}
>
  <input
    type="text"
    {disabled}
    on:focus={handleFocus}
    placeholder={placeholder[0]}
    size="20"
    autocomplete="off"
    value={toDateString(value[0])}
  />
  <input
    type="text"
    {disabled}
    on:focus={handleFocus}
    placeholder={placeholder[1]}
    size="20"
    autocomplete="off"
    value={toDateString(value[1])}
  />
</div>
<div class="resp-date-range-picker__calendars">
  <Calendar />
  <Calendar />
</div>

<style lang="scss">
  .resp-date-range-picker {
    display: inline-flex;
    flex-direction: row;
    padding: 0 8px;
    height: var(--input-height, 30px);
    line-height: var(--input-height, 30px);

    input[type="text"] {
      width: 80px;
      cursor: inherit;
      font-family: inherit;
      display: inline-block;
      background: inherit;
      outline: none;
      border: none;
      flex: auto;
    }

    &__calendars {
      display: flex;
      flex-direction: row;
    }
  }
</style>
