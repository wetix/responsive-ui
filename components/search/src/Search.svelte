<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Loader from "@responsive-ui/loader";

  import type { SearchState } from "../types";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let ref: null | HTMLInputElement = null;
  export let name = "";
  export let value = "";
  export let disabled = false;
  export let size = 100;
  export let debounceTimer = 1000;
  export let spellcheck = false;
  export let placeholder = "";

  let state: null | SearchState;
  let timer: NodeJS.Timeout | undefined;

  const handleClear = (e: Event) => {
    const v = (<HTMLInputElement>e.currentTarget).value;
    if (v === "") dispatch("clear");
  };

  const handleKeyup = (e: KeyboardEvent) => {
    const v = (<HTMLInputElement>e.target).value;
    const key = e.key || e.keyCode;
    value = v;
    state = "loading";

    let timeout = debounceTimer;
    // when user click enter
    if (key === "Enter" || key === 13) {
      timeout = 0;
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      dispatch("search", v);
      state = null;
    }, timeout);
  };
</script>

<input
  class="responsive-ui-search {className}"
  bind:this={ref}
  type="search"
  {name}
  {disabled}
  {placeholder}
  {size}
  {value}
  {spellcheck}
  on:input
  on:input={handleClear}
  on:keyup={handleKeyup}
/>

{#if state}
  <div class="responsive-ui-search__state">
    <Loader size="small" />
    <div class="responsive-ui-search__state-text">Searching...</div>
  </div>
{/if}

<slot {state} />

<style lang="scss">
  .responsive-ui-search {
    display: block;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    box-sizing: border-box;
    margin: 0;
    padding: 0 10px;
    appearance: none;
    font-family: var(--font-family, inherit);
    font-size: var(--font-size, 14px);
    height: var(--height, 34px);
    border-radius: var(--border-radius, 5px);
    width: 100%;
    outline: none;

    &:disabled {
      cursor: not-allowed !important;
      opacity: 0.5;
    }

    &__state {
      padding: 6px 0;
      display: flex;
      align-items: center;

      &-text {
        margin-left: 8px;
      }
    }
  }
</style>
