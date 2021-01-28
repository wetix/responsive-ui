<script lang="ts">
  import { onMount } from "svelte";

  import type { TooltipTrigger } from "../types";

  let className = "";
  export { className as class };
  export let offset = 10;
  export let text = "";
  export let html = false;
  export let placement = "auto";
  export let target: HTMLElement;
  export let trigger: TooltipTrigger[] = ["mouseenter", "click"];

  let clientWidth = 0;
  let clientHeight = 0;

  const getAbsolutePosition = (el: HTMLElement) => {
    let top = el.offsetTop,
      left = el.offsetLeft;
    const height = el.offsetHeight,
      width = el.offsetWidth;

    while (el.offsetParent) {
      el = el.offsetParent as HTMLElement;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return {
      top: top,
      left: left,
      right: left + width,
      bottom: top + height,
      height,
      width,
    };
  };

  let hide = true;
  let top = 0;
  let left = 0;

  onMount(() => {
    const rect = getAbsolutePosition(target);

    top = rect.top - clientHeight - offset;
    left = rect.left + (rect.width - clientWidth) / 2;
    if (placement === "auto") {
      if (top <= 0) top = offset;
      if (left <= 0) left = offset;
    }
    switch (placement) {
      case "top-left":
        left = rect.left;
        break;
      case "top-right":
        left = rect.right - clientWidth;
        break;
      case "left":
        top = rect.top + (rect.height - clientHeight) / 2;
        left = rect.left - clientWidth - offset;
        break;
      case "right":
        top = rect.top + (rect.height - clientHeight) / 2;
        left = rect.right + offset;
        break;
      case "bottom":
        top = rect.bottom + offset;
        break;
      case "bottom-left":
        top = rect.bottom + offset;
        left = rect.left;
        break;
      case "bottom-right":
        top = rect.bottom + offset;
        left = rect.right - clientWidth;
        break;
      default:
    }

    hide = false;
  });
</script>

<span
  class="responsive-ui-tooltip responsive-ui-tooltip--align-{placement} {className}"
  class:responsive-ui-tooltip--hide={hide}
  bind:clientWidth
  bind:clientHeight
  style={`top:${top}px;left:${left}px;`}
>
  {#if html}
    {@html text}
  {:else}
    {text}
  {/if}
</span>

<style lang="scss">
  .responsive-ui-tooltip {
    position: absolute;
    background: #3b3b3b;
    padding: 8px 12px;
    max-width: 250px;
    font-size: var(--font-size-sm, 12px);
    border-radius: var(--border-radius, 5px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    color: #fff;
    transition: opacity 0.3s;
    opacity: 1;
    z-index: 50;

    $width: 6px;
    &:after {
      position: absolute;
      content: "";
      width: 0;
      height: 0;
    }

    &--align-top:after,
    &--align-top-left:after,
    &--align-top-right:after {
      left: calc(50% - 6px);
      bottom: -$width;
      border-left: $width solid transparent;
      border-right: $width solid transparent;
      border-top: $width solid #3b3b3b;
    }

    &--align-bottom:after,
    &--align-bottom-left:after,
    &--align-bottom-right:after {
      top: -$width;
      left: calc(50% - 6px);
      border-left: $width solid transparent;
      border-right: $width solid transparent;
      border-bottom: $width solid #3b3b3b;
    }

    &--align-top-left:after,
    &--align-bottom-left:after {
      left: calc(75% - 6px);
    }
    &--align-top-right:after,
    &--align-bottom-right:after {
      left: calc(25% - 6px);
    }

    &--align-left:after {
      right: -$width;
      top: calc(50% - 6px);
      border-top: $width solid transparent;
      border-bottom: $width solid transparent;
      border-left: $width solid #3b3b3b;
    }

    &--align-right:after {
      left: -$width;
      top: calc(50% - 6px);
      border-top: $width solid transparent;
      border-bottom: $width solid transparent;
      border-right: $width solid #3b3b3b;
    }

    &--hide {
      opacity: 0;
      z-index: -1;
    }
  }
</style>
