import type { SvelteComponentTyped } from "svelte/internal";

export interface InfiniteScrollProps {}

export interface InfiniteScrollEvents {}

export interface InfiniteScrollSlots {
  default: {};
  loader?: {};
}

declare class InfiniteScroll extends SvelteComponentTyped<
  InfiniteScrollProps,
  InfiniteScrollEvents,
  InfiniteScrollSlots
> {}

export default InfiniteScroll;
