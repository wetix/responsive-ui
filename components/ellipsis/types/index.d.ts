import type { SvelteComponentTyped } from "svelte/internal";

export interface EllipsisProps {
  class?: string;
  text?: string;
  style?: string;
}

export interface EllipsisEvents {
  click?: any;
}

export interface EllipsisSlots {
  default: {};
}

declare class Ellipsis extends SvelteComponentTyped<
  EllipsisProps,
  EllipsisEvents,
  EllipsisSlots
> {}

export default Ellipsis;
