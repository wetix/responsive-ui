import type { SvelteComponentTyped } from "svelte/internal";

export interface ScrollProps {
  id?: string;
  title?: string;
  class?: string;
  style?: string;
}

export interface ScrollEvents {
  scroll?: WindowEventMap["scroll"];
}

export interface ScrollSlots {
  default: {};
}

declare class Scroll extends SvelteComponentTyped<
  ScrollProps,
  ScrollEvents,
  ScrollSlots
> {}

export default Scroll;
