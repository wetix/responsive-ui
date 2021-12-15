import type { SvelteComponentTyped } from "svelte/internal";

export type TooltipTrigger = "mouseover" | "focus" | "click";

export interface TooltipProps {
  class?: string;
  offset?: number;
  trigger?: TooltipTrigger[];
}

interface TooltipEvents {}

interface TooltipSlots {
  default: {};
  tooltip: {
    title: string;
  };
}

declare class Tooltip extends SvelteComponentTyped<
  TooltipProps,
  TooltipEvents,
  TooltipSlots
> {}

export default Tooltip;
