<script lang="ts">
  export let name = "";
  export let value = "";
  export let size = 100;
  export let loading = false;
  export let debounceTimer = 1000;
  export let spellcheck = false;
  export let placeholder = "";
  export let search = (_: string) => {};

  const debounce = (func: Function, timeout?: number) => {
    let timer: NodeJS.Timeout | undefined;
    return (...args: any[]) => {
      const next = () => func(...args);
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(next, timeout > 0 ? timeout : 300);
    };
  };

  const cb = debounce((v: string) => {
    search && search(v);
    loading = false;
  }, debounceTimer);

  const handleKeyPress = (e: KeyboardEvent) => {
    const v = (<HTMLInputElement>e.target).value;
    const key = e.key || e.keyCode;
    value = v;
    loading = true;
    // when user click enter
    // let timeout = debounceTimer;
    if (key === "Enter" || key === 13) {
      // timeout = 0;
      search && search(v);
    } else {
      cb(v);
    }
  };
</script>

<style lang="scss">
  .responsive-ui-search {
    display: block;
    border: 1px solid #dcdcdc;

    overflow: hidden;
    border-radius: 5px;
    box-sizing: border-box;

    input {
      margin: 0;
      border: none;
      font-family: inherit;
      font-size: var(--font-size, 14px);
      height: var(--height, 34px);
      padding: 0 10px;
      width: 100%;
      outline: none;
    }
  }
</style>

<div class="responsive-ui-search">
  <input
    type="search"
    {placeholder}
    {size}
    {value}
    {spellcheck}
    on:keyup={handleKeyPress} />
</div>
