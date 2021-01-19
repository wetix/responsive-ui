<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Loader from "@responsive-ui/loader";

  import type { SearchState } from "../types";

  const dispatch = createEventDispatcher();

  export let name = "";
  export let value = "";
  export let size = 100;
  export let debounceTimer = 1000;
  export let spellcheck = false;
  export let placeholder = "";

  let state: null | SearchState;
  const debounce = (func: Function, timeout: number) => {
    let timer: NodeJS.Timeout | undefined;
    return (...args: any[]) => {
      const next = () => func(...args);
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(next, timeout);
    };
  };

  const cb = debounce((v: string) => {
    dispatch("search", v);
    state = null;
  }, debounceTimer);

  const handleKeyPress = (e: KeyboardEvent) => {
    const v = (<HTMLInputElement>e.target).value;
    const key = e.key || e.keyCode;
    value = v;
    state = "loading";
    // when user click enter
    // let timeout = debounceTimer;
    if (key === "Enter" || key === 13) {
      // timeout = 0;
      dispatch("search", v);
    } else {
      cb(v);
    }
  };
</script>

<div class="responsive-ui-search">
  <input
    type="search"
    {name}
    {placeholder}
    {size}
    {value}
    {spellcheck}
    on:keyup={handleKeyPress}
  />
</div>

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
    border-radius: 5px;
    box-sizing: border-box;

    input[type="search"] {
      margin: 0;
      padding: 0 10px;
      border: none;
      font-family: inherit;
      font-size: var(--font-size, 14px);
      height: var(--height, 34px);
      width: 100%;
      outline: none;
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
