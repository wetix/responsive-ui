<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let timer: NodeJS.Timeout | undefined;
  let className = "";

  export { className as class };
  export let ref: HTMLInputElement;
  export let name = "";
  export let bordered = true;
  export let value = "";
  export let disabled = false;
  export let size = 100;
  export let loading = false;
  export let debounceTimer = 1000;
  export let placeholder = "";

  const onClear = (e: Event) => {
    const v = (<HTMLInputElement>e.currentTarget).value;
    if (v === "") {
      dispatch("clear");
      value = "";
    }
  };

  const handleKeyup = (e: KeyboardEvent) => {
    const v = (<HTMLInputElement>e.target).value;
    const key = e.keyCode || e.which;
    if (e.ctrlKey || e.metaKey) {
      return;
    }
    value = v;
    loading = true;
    let timeout = debounceTimer;
    // when user click enter
    if (key === 13) {
      timeout = 0;
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      dispatch("search", v);
    }, timeout);
  };
</script>

<input
  class="resp-search {className}"
  class:resp-search--bordered={bordered}
  bind:this={ref}
  type="search"
  {name}
  {disabled}
  {placeholder}
  {size}
  {value}
  on:input
  on:input={onClear}
  on:keyup={handleKeyup}
/>

{#if loading}
  <div class="resp-search__state">
    <!-- <Loader size="small" /> -->
    <div class="resp-search__state-text">Searching...</div>
  </div>
{/if}

<slot {loading} />

<style lang="scss" global>
  .resp-search {
    display: inline-flex;
    border: 1px solid transparent;
    overflow: hidden;
    box-sizing: border-box;
    margin: 0;
    padding: 0 10px;
    appearance: none;
    font-family: var(--font-family, inherit);
    font-size: var(--font-size, 14px);
    height: var(--input-height, 30px);
    border-radius: var(--border-radius, 5px);
    transition: all 0.5s;
    outline: none;

    &--focused,
    &:hover {
      border-color: #fc4451;
    }

    &--focused,
    &:focus {
      border-color: #fc4451;
      box-shadow: 0 0 0 3px rgba(252, 68, 81, 0.3);
    }

    &:disabled {
      cursor: not-allowed !important;
      opacity: 0.5;
    }

    &--bordered {
      border-color: var(--input-border-color, #dcdcdc);
    }

    @media (max-width: 576px) {
      width: 100%;
    }
  }
</style>
