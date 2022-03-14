import type { SvelteComponentTyped } from "svelte/internal";

export interface IconProps {
  id?: string;
  class?: string;
  fill?: string;
  stroke?: string;
  viewBox?: string;
  useHref?: string;
  style?: string;
  sizeOf?: string;
}

export interface IconEvents {
  click?: WindowEventMap["click"];
}

export interface IconSlots {
  default: Record<string, unknown>;
}

export declare class IconComponent extends SvelteComponentTyped<
  IconProps,
  IconEvents,
  IconSlots
> {}

export default IconComponent;
