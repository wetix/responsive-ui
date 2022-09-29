import { linear } from "svelte/easing";

// gets a certain attribute from parent nodes
export const getNodeAttribute = (e: Event, attr: string): string | null => {
  const { currentTarget = document.body } = e;
  let { target }: any = e;
  while (target != currentTarget) {
    if (target && target.hasAttribute(attr)) return target.getAttribute(attr);
    target = target.parentNode;
  }
  if (target && target.hasAttribute(attr)) return target.getAttribute(attr);
  return null;
};

// zoom animation for select tags
export const zoom = (_: HTMLElement, { duration = 200, easing = linear }) => {
  return {
    duration,
    easing,
    css: (t: number) => {
      return `transform: scale(${t}); opacity: ${t};`;
    }
  };
};
