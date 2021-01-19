<script lang="ts">
  import { onDestroy } from "svelte";

  import type { TooltipTrigger } from "../types";

  let className = "";
  export { className as class };
  export let placeholder = "";
  export let trigger: TooltipTrigger[] = ["mouseenter", "click"];
  export let show = false;

  let style = "";
  let clientHeight = 0;
  const callbacks: [Node, string, EventListener][] = [];
  const mounted = (node: HTMLSpanElement) => {
    const children = node.children;

    let child;
    let len = children.length;
    for (let i = 0; i < len; i++) {
      child = children[i];
      trigger.forEach((evt: TooltipTrigger) => {
        const cb = (e: Event) => {
          if (evt === "click" && show) {
            show = false;
            style = "";
            return;
          }

          const rect = (<HTMLElement>e.currentTarget).getBoundingClientRect();
          const rect1 = document.body.getBoundingClientRect();
          const x = rect.x - rect1.x;
          const y = rect.y - rect1.y - clientHeight - 15;
          show = true;
          style = `top:${y}px;left:${x}px;visibility:visible;`;
        };
        child.addEventListener(evt, cb);
        callbacks.push([child, evt, cb]);
      });
    }
    node.replaceWith(...children);
  };

  onDestroy(() => {
    callbacks.forEach(([child, evt, cb]: [Node, string, EventListener]) => {
      child.removeEventListener(evt, cb);
    });
  });
</script>

<span use:mounted><slot /></span>

<span class="responsive-ui-tooltip {className}" bind:clientHeight {style}
  >{placeholder}</span
>

<style lang="scss">
  .responsive-ui-tooltip {
    position: absolute;
    background: #3b3b3b;
    padding: 8px 10px;
    max-width: 250px;
    font-size: var(--font-size-sm, 12px);
    border-radius: var(--border-radius, 5px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    color: #fff;
    visibility: hidden;
    z-index: 10;

    &:after {
      $width: 6px;

      content: "";
      position: absolute;
      left: calc(50% - 6px);
      bottom: -$width;
      width: 0;
      height: 0;
      border-left: $width solid transparent;
      border-right: $width solid transparent;
      border-top: $width solid #3b3b3b;
    }
  }
</style>
