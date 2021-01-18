import type { SvelteComponentTyped } from "svelte/internal";

export type TooltipTrigger = "mouseenter" | "focus" | "click";

export interface TooltipProps {
  placeholder: string;
  trigger?: TooltipTrigger[];
}

interface TooltipEvents {}

interface TooltipSlots {
  default: {};
}

declare class Tooltip extends SvelteComponentTyped<
  TooltipProps,
  TooltipEvents,
  TooltipSlots
> {}

export default Tooltip;
