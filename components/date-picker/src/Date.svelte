<script lang="ts">
  export let placeholder = "Select date";
  export let value = "";
  export let format = (v: string) => v;

  let hide = false;
  let inputRef: HTMLInputElement;

  $: formatDate = format(value);
  const handleChange = (e: Event) => {
    console.log(e.currentTarget.value);
  };
  const handleBlur = () => {
    value = "";
  };
  const handleClear = () => {
    value = "";
    inputRef.focus();
    setTimeout(() => {
      hide = false;
    }, 200);
  };
</script>

<div class="date-picker">
  <input
    bind:this={inputRef}
    type="text"
    {placeholder}
    on:change={handleChange}
    on:blur={handleBlur}
    size="20"
    autocomplete="off"
    value={formatDate}
  />
  <span role="img" aria-label="calendar">C</span>
  <span class="date-picker-close" role="button" on:click={handleClear}>X</span>
  {#if !hide}
    <div>Calendar</div>
  {/if}
</div>

<style lang="scss">
  .date-picker {
    display: inline-flex;
    border: 1px solid #dcdcdc;
    align-items: center;
    border-radius: 3px;
    transition: all 0.5s;

    input[type="text"] {
      display: inline-block;
      outline: none;
      border: none;
    }

    &:hover {
      border-color: red;
    }

    .date-picker-close {
      position: absolute;
      top: 50%;
      right: 0;
      color: #00000040;
      line-height: 1;
      background: #fff;
      transform: translateY(-50%);
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s, color 0.3s;
    }
  }
</style>
