<script lang="ts">
  import { tick } from "svelte";
  import { fade } from "svelte/transition";
  import type { TooltipTrigger } from "../types";

  const titleAttr = "data-tooltip";

  let className = "";
  export { className as class };
  export let offset = 10;
  export let trigger: TooltipTrigger[] = ["mouseover"];

  let show = false;
  let translateX = 0;
  let translateY = 0;
  let placement: [string, string] = ["top", ""];
  let title = "";
  let shallowDom: HTMLSpanElement;

  const tooltip = (node: Node) => {
    const listeners: [string, EventListener][] = [];
    const parent = <HTMLDivElement>node.parentNode;
    const { firstChild } = node;
    if (!firstChild) return {};

    const attachEvent = (el: Node, event: string, cb: EventListener) => {
      el.addEventListener(event, cb);
      listeners.push([event, cb]);
    };

    parent.insertBefore(firstChild, node);
    parent.removeChild(node);

    const toggleTooltip = (toggle: boolean) => async (e: Event) => {
      const target = e.composedPath().find((el) => {
        return (
          el instanceof HTMLElement &&
          ((el as HTMLElement).hasAttribute(titleAttr) ||
            (el as HTMLElement).title)
        );
      }) as HTMLElement;

      if (!target) return;
      title = target.title || target.getAttribute(titleAttr) || "";
      target.removeAttribute("title");
      target.setAttribute(titleAttr, title);

      // let it render first
      await tick();

      const { width, height } = shallowDom.getBoundingClientRect();

      const rect = target.getBoundingClientRect();
      const { innerWidth } = window;
      let newPlacement: [string, string] = ["top", ""];
      let newTop = rect.top - height - offset;
      let newLeft = rect.left + (rect.width - width) / 2;

      if (newTop <= 0) {
        newTop = rect.top + rect.height + offset;
        newPlacement[0] = "bottom";
      }
      if (newLeft <= 0) {
        newPlacement[1] = "right";
        newLeft = offset;
      }
      if (newLeft + width >= innerWidth) {
        newLeft = innerWidth - (width + offset);
        newPlacement[1] = "left";
      }

      setTimeout(() => {
        translateY = newTop;
        translateX = newLeft;
        placement = newPlacement;

        if (toggle) show = !show;
        else show = true;
      }, 0);
    };
    if (trigger.includes("click")) {
      attachEvent(firstChild, "click", toggleTooltip(true));
    }
    if (trigger.includes("mouseover")) {
      attachEvent(firstChild, "mouseover", toggleTooltip(false));
      attachEvent(firstChild, "mouseleave", () => {
        show = false;
      });
    }

    return {
      destroy() {
        if (firstChild) {
          listeners.forEach(([k, cb]) => {
            firstChild.removeEventListener(k, cb);
          });
        }
      },
    };
  };

  $: alignClass = placement.reduce((acc, v) => {
    if (!v) return acc;
    acc += `-${v}`;
    return acc;
  }, "resp-tooltip--align");
</script>

<div use:tooltip>
  <slot />
</div>

{#if show}
  <span
    class="resp-tooltip {alignClass} {className}"
    {...$$restProps}
    in:fade
    out:fade
    style="top: {translateY}px; left: {translateX}px"
  >
    <slot name="tooltip" {title}>{title}</slot>
  </span>
{/if}

<span class="resp-tooltip__clone" bind:this={shallowDom}
  ><slot name="tooltip">{title}</slot></span
>

<style lang="scss" global>
  $width: 5px;

  .resp-tooltip {
    &__clone {
      position: absolute;
      margin: 10px;
      padding: 0.5rem;
      max-width: 100%;
      top: -999999999px;
      font-size: var(--font-size-sm, 12px);
    }

    position: absolute;
    pointer-events: none;
    background: #3b3b3b;
    margin: 0;
    padding: 0.5rem;
    max-width: calc(100vw - 40px);
    font-family: inherit;
    font-size: var(--font-size-sm, 12px);
    border-radius: var(--border-radius, 5px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    color: #fff;
    transition: opacity 0.35s;
    opacity: 1;
    z-index: 999;

    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
    }

    &--align-top:after,
    &--align-top-left:after,
    &--align-top-right:after {
      left: calc(50% - $width);
      bottom: -$width;
      border-left: $width solid transparent;
      border-right: $width solid transparent;
      border-top: $width solid #3b3b3b;
    }

    &--align-bottom:after,
    &--align-bottom-left:after,
    &--align-bottom-right:after {
      top: -$width;
      left: calc(50% - $width);
      border-left: $width solid transparent;
      border-right: $width solid transparent;
      border-bottom: $width solid #3b3b3b;
    }

    &--align-top-left:after,
    &--align-bottom-left:after {
      left: calc(85% - $width);
    }
    &--align-top-right:after,
    &--align-bottom-right:after {
      left: calc(15% - $width);
    }

    &--align-left:after {
      right: -$width;
      top: calc(50% - $width);
      border-top: $width solid transparent;
      border-bottom: $width solid transparent;
      border-left: $width solid #3b3b3b;
    }

    &--align-right:after {
      left: -$width;
      top: calc(50% - $width);
      border-top: $width solid transparent;
      border-bottom: $width solid transparent;
      border-right: $width solid #3b3b3b;
    }
  }
</style>
