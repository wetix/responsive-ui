import type { SvelteComponentTyped } from "svelte/internal";

export interface IconProps {
  id?: string;
  class?: string;
  size?: "small" | "medium" | "large";
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
  useHref?: string;
  style?: string;
}

export interface IconEvents {
  click?: any;
}

export interface IconSlots {
  default: {};
}

declare class Icon extends SvelteComponentTyped<
  IconProps,
  IconEvents,
  IconSlots
> {}

export default Icon;
