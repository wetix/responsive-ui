<script lang="ts">
  import type { SelectOption } from "../types";

  export let name = "";
  export let value = "";
  export let readonly = false;
  export let options: SelectOption[] = [];
</script>

<style lang="scss">
  .responsive-ui-select {
    display: block;
    width: 100%;
    border: none;
    border-radius: var(--border-radius, 5px);
    font-size: var(--font-size, 14px);
    font-family: inherit;
    color: #1a1b1c;
    background: #f1f1f1;
    outline: none;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
  }
</style>

<select class="responsive-ui-select" {name} {readonly}>
  {#each options as option}
    <option value={option.value}>{option.title}</option>
  {/each}
</select>
