import type { SvelteComponentTyped } from "svelte/internal";

export interface IconProps {
  type: string;
  style?: string;
}

export interface IconEvents {
  click?: void;
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
