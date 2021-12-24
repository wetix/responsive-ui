<script lang="ts">
  import { createEventDispatcher } from "svelte";
  // import Loader from "@resp/loader";

  const dispatch = createEventDispatcher();

  let timer: NodeJS.Timeout | undefined;
  let className = "";

  export { className as class };
  export let ref: null | HTMLInputElement = null;
  export let name = "";
  export let value = "";
  export let disabled = false;
  export let size = 100;
  export let loading = false;
  export let debounceTimer = 1000;
  export let spellcheck = false;
  export let placeholder = "";

  const onClear = (e: Event) => {
    const v = (<HTMLInputElement>e.currentTarget).value;
    if (v === "") {
      dispatch("clear");
      value = "";
    }
  };

  const onKeyup = (e: KeyboardEvent) => {
    const v = (<HTMLInputElement>e.target).value;
    const key = e.key || e.keyCode;
    if (e.ctrlKey || e.metaKey) {
      return;
    }
    value = v;
    loading = true;
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
    }, timeout);
  };
</script>

<input
  class="resp-search {className}"
  bind:this={ref}
  type="search"
  {name}
  {disabled}
  {placeholder}
  {size}
  {value}
  {spellcheck}
  on:input
  on:input={onClear}
  on:keyup={onKeyup}
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
