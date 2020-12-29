<script lang="ts">
  import { onMount } from "svelte";

  export let name = "";
  export let placeholder = "";
  export let rows = 4;
  export let value = "";
  export let autofocus = false;
  export let autoresize = true;
  // export let resize = "none";

  let input: null | HTMLTextAreaElement;

  onMount(() => {
    if (input && autofocus) {
      input.focus();
    }
  });

  const onInput = (e: Event) => {
    value = (e.target as HTMLTextAreaElement).value;
    if (autoresize) {
      input.style.height = "auto";
      input.style.height = input.scrollHeight + "px";
    }
  };
</script>

<style lang="scss">
  .responsive-ui-textarea {
    width: 100%;
    font-size: var(--font-size, 14px);
    font-family: inherit;
    color: #1a1b1c;
    background: #f1f1f1;
    border: none;
    outline: 0;
    resize: none;
    border-radius: 5px;
    padding: 10px;
    margin: 0;
    transition: all 0.5s;

    &:hover {
      border: none;
    }
  }
</style>

<textarea
  class="responsive-ui-textarea"
  bind:this={input}
  {name}
  {rows}
  {placeholder}
  {value}
  on:blur
  on:input={onInput}
  on:input />
