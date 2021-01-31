import Tooltip from "./Tooltip.svelte";

import type { TooltipProps } from "../types/tooltip";

const attrName = "data-tooltip";

const tooltip = (node: Node, params: Partial<TooltipProps> = {}) => {
  // const { trigger = ["mouseenter"] } = params;

  let comp: null | Tooltip = null;

  const target = <HTMLElement>node;
  const title = (target.title || target.getAttribute(attrName) || "").trim();

  target.setAttribute(attrName, title);
  target.removeAttribute("title");

  const onDestroy = () => {
    comp && comp.$destroy();
    comp = null;
  };

  node.addEventListener("mouseenter", (e: Event) => {
    if (!comp) {
      comp = new Tooltip({
        target: document.body,
        intro: true,
        props: {
          ...params,
          target: node,
          text: <string>target.getAttribute(attrName),
        },
      });
    }
    node.addEventListener("mouseleave", onDestroy);
  });

  return {
    destroy: onDestroy,
  };
};

// export default Tooltip;
export { tooltip };
