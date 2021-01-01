import type { SvelteComponentTyped } from "svelte/internal";

export interface SearchProps {}

export interface SearchEvents {}

export interface SearchSlots {
  default: {};
}

declare class Search extends SvelteComponentTyped<
  SearchProps,
  SearchEvents,
  SearchSlots
> {}

export default Search;
