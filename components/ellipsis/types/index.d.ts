import type { SvelteComponentTyped } from "svelte/internal";

export interface EllipsisProps {
  id?: string;
  title?: string;
  class?: string;
  width?: string;
  style?: string;
}

export interface EllipsisEvents {
  click?: WindowEventMap["click"];
}

export interface EllipsisSlots {
  default: {};
}

export declare class EllipsisComponent extends SvelteComponentTyped<
  EllipsisProps,
  EllipsisEvents,
  EllipsisSlots
> {}

export default EllipsisComponent;
