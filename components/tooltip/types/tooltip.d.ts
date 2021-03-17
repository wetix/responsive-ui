import type { SvelteComponentTyped } from "svelte/internal";

export type TooltipTrigger = "mouseenter" | "focus" | "click";

export interface TooltipProps {
  class?: string;
  offset?: number;
  placement?:
    | string
    | "auto"
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "top-left"
    | "top-right"
    | "bottom-left";
  text: string;
  html?: boolean;
  trigger?: TooltipTrigger[];
  timeout?: number;
}

interface TooltipEvents {}

interface TooltipSlots {}

declare class Tooltip extends SvelteComponentTyped<
  TooltipProps,
  TooltipEvents,
  TooltipSlots
> {}

export default Tooltip;
