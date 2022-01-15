<script lang="ts">
  import { onMount } from "svelte";

  let className = "";
  export { className as class };
  export let threshold = 100;
  export let style = "";

  let updatedHeight: number | string = "auto";
  let height = 0;
  let clientHeight = 0;

  $: isExpanded = updatedHeight === height;
  $: isExtensible = threshold < height;

  const handleClick = () => {
    updatedHeight = updatedHeight !== height ? height : threshold;
  };

  onMount(() => {
    height = clientHeight;
    updatedHeight = threshold > height ? height : threshold;
  });
</script>

<div
  class="resp-show-more {className}"
  {...$$restProps}
  bind:clientHeight
  style={`height: ${updatedHeight}px; ${style}`}
>
  <slot />
</div>
{#if isExtensible}
  <div class="resp-show-more__trigger" on:click={handleClick}>
    <slot name="trigger">{isExpanded ? "- Less" : "+ More"}</slot>
  </div>
{/if}

<style lang="scss" global>
  .resp-show-more {
    overflow: hidden;
    transition: all 0.5s;

    &__trigger {
      cursor: pointer;
      box-sizing: border-box;
      font-size: var(--font-size-lg, 14px);
      font-weight: 600;
      text-align: right;
      width: 100%;
      padding: 5px 15px 5px 0;
    }
  }
</style>
