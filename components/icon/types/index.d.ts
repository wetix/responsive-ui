import type { SvelteComponentTyped } from "svelte/internal";

export interface IconProps {
  id?: string;
  class?: string;
  sizeOf?: "sm" | "md" | "lg";
  fill?: string;
  stroke?: string;
  viewBox?: string;
  useHref?: string;
  style?: string;
}

export interface IconEvents {
  click?: WindowEventMap["click"];
}

export interface IconSlots {
  default: {};
}

export declare class IconComponent extends SvelteComponentTyped<
  IconProps,
  IconEvents,
  IconSlots
> {}

export default IconComponent;
