<script lang="ts">
  export let value = "";
  export let size = 100;
  export let spellcheck = false;
  export let placeholder = "";
  export let onChange = (_: string) => {};
  export let onSearch = (_: string) => {};

  const handleKeyPress = (e: KeyboardEvent) => {
    const v = (e.target as HTMLInputElement).value;
    value = v;
    onChange(v);
    // when user click enter
    if (e.key === "Enter") {
      onSearch(v);
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
      font-size: inherit;
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
    on:keypress={handleKeyPress} />
</div>
