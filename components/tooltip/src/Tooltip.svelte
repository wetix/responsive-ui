<script lang="ts">
  // import { onMount, tick } from "svelte";

  import type { TooltipTrigger } from "../types/tooltip";

  const titleAttr = "data-tooltip";

  let className = "";
  export { className as class };
  export let offset = 10;
  export let trigger: TooltipTrigger[] = ["click", "mouseenter"];

  // const hasSlot = Object.keys($$slots).length > 0;
  let clientWidth = 0;
  let clientHeight = 0;
  let translateX = 0;
  let translateY = 0;
  let placement = "top";
  let show = false;
  let title = "";

  const getAbsPos = (el: HTMLElement) => {
    let top = el.offsetTop,
      left = el.offsetLeft;
    const height = el.offsetHeight,
      width = el.offsetWidth;

    while (el.offsetParent) {
      el = <HTMLElement>el.offsetParent;
      const style = window.getComputedStyle(el);
      if (
        ["absolute", "fixed", "relative"].includes(
          style.getPropertyValue("position")
        )
      )
        break;
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

  const findTarget = (e: Event) => {
    const target = e.composedPath().find((el) => {
      return (
        el instanceof HTMLElement &&
        ((el as HTMLElement).hasAttribute(titleAttr) ||
          (el as HTMLElement).title)
      );
    }) as HTMLElement;
  };

  const tooltip = (node: Node) => {
    const listeners: [string, EventListener][] = [];
    const parent = <HTMLDivElement>node.parentNode;
    // const firstChild = <ChildNode>node.firstChild;
    const { firstChild } = node;
    if (!firstChild) return;

    const attachEvent = (el: Node, event: string, cb: EventListener) => {
      el.addEventListener(event, cb);
      listeners.push([event, cb]);
    };

    // if (firstChild.nodeType === Node.ELEMENT_NODE) {
    parent.insertBefore(firstChild, node);
    parent.removeChild(node);
    console.log(parent, firstChild);
    const toggleTooltip = (e: Event) => {
      console.log(e.target, e.composedPath());
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
      const rect = getAbsPos(target);
      let newPlacement = "top";
      let newTop = rect.top - clientHeight - offset;
      let newLeft = rect.left + (clientWidth - rect.width + offset * 2) / 2;
      if (newTop <= 0) {
        newTop = rect.height + offset;
        newPlacement = "bottom";
      }
      if (newLeft <= 0) newLeft = offset;
      setTimeout(() => {
        translateY = newTop;
        translateX = newLeft;
        placement = newPlacement;
        show = !show;
      }, 0);
    };
    if (trigger.includes("click")) {
      attachEvent(firstChild, "click", toggleTooltip);
    }
    if (trigger.includes("mouseenter")) {
      console.log("attachMouse");
      attachEvent(firstChild, "mouseenter", toggleTooltip);
      attachEvent(firstChild, "mouseleave", () => {
        show = false;
      });
    }
    // }
    return {
      destroy() {
        listeners.forEach(([k, cb]) => {
          firstChild.removeEventListener(k, cb);
        });
      },
    };
  };

  // $: console.log($$slots);
</script>

<span use:tooltip>
  <slot />
</span>

<span
  class="resp-tooltip resp-tooltip--align-{placement} {className}"
  class:resp-tooltip--hide={!show}
  bind:clientWidth
  bind:clientHeight
  {...$$restProps}
  style="top: {translateY}px; left: {translateX}px"
>
  <slot name="tooltip" {title}>{title}</slot>
</span>

<style lang="scss" global>
  $width: 6px;

  .resp-tooltip {
    position: absolute;
    pointer-events: none;
    background: #3b3b3b;
    margin: 0;
    padding: 8px 12px;
    max-width: calc(100vw - 20px);
    font-size: var(--font-size-sm, 12px);
    border-radius: var(--border-radius, 5px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    color: #fff;
    visibility: visible;
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
      visibility: hidden;
      opacity: 0;
      z-index: -999;
    }
  }
</style>
