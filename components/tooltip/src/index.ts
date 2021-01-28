import Tooltip from "./Tooltip.svelte";

import type { TooltipProps } from "../types";

const useTooltip = (node: Node, params: Partial<TooltipProps> = {}) => {
  node.addEventListener("mouseenter", (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target && target.title) {
      const title = target.title.trim();
      if (!title) return;

      target.setAttribute("data-tooltip", title);
      target.removeAttribute("title");

      const comp = new Tooltip({
        target: document.body,
        intro: true,
        props: {
          ...params,
          target,
          text: title,
        },
      });

      // const mouseLeave = (e: MouseEvent) => {
      //   const target = <HTMLElement>e.currentTarget;
      //   target.removeEventListener("mouseleave", () => {});
      //   // restore title
      //   target.setAttribute("title", target.getAttribute("data-tooltip") || "");
      //   setTimeout(() => {
      //     comp.$destroy();
      //   }, 150);
      // };

      // target.addEventListener("mouseleave", mouseLeave);
    }
  });

  return {
    update() {},
    destroy() {},
  };
};

export { useTooltip as tooltip };
