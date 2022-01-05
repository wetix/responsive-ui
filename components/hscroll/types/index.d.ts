import type { SvelteComponentTyped } from "svelte/internal";

export interface HScrollProps {
  id?: string;
  title?: string;
  class?: string;
  scrollable?: boolean;
  style?: string;
}

export interface HScrollEvents {
  scroll?: WindowEventMap["scroll"];
}

export interface HScrollSlots {
  default: {};
}

export declare class HScrollComponent extends SvelteComponentTyped<
  HScrollProps,
  HScrollEvents,
  HScrollSlots
> {}

export default HScrollComponent;
