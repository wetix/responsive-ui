import type { SvelteComponentTyped } from "svelte/internal";

export type TooltipTrigger = "mouseover" | "focus" | "click";

export interface TooltipProps {
  id?: string;
  class?: string;
  offset?: number;
  trigger?: TooltipTrigger[];
  style?: string;
}

export interface TooltipEvents {}

export interface TooltipSlots {
  default: {};
  tooltip: {
    title: string;
  };
}

export declare class TooltipComponent extends SvelteComponentTyped<
  TooltipProps,
  TooltipEvents,
  TooltipSlots
> {}

export default TooltipComponent;
