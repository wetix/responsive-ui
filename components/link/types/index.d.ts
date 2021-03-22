import type { SvelteComponentTyped } from "svelte/internal";

export interface LinkProps {
  id?: string;
  class?: string;
  label?: string;
  href?: string;
  style?: string;
}

export interface LinkEvents {
  click?: WindowEventMap["click"];
}

export interface LinkSlots {
  default: {};
}

declare class Link extends SvelteComponentTyped<
  LinkProps,
  LinkEvents,
  LinkSlots
> {}

export default Link;
