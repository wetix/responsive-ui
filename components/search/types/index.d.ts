import type { SvelteComponentTyped } from "svelte/internal";

export type SearchState = "loading";

export interface SearchProps {
  name: string;
  value: any;
  placeholder?: string;
  size?: number;
  spellcheck?: boolean;
  debounceTimer?: number;
}

export interface SearchEvents {
  search?: (e: CustomEvent<string>) => void;
}

export interface SearchSlots {
  default: {
    state: SearchState;
  };
}

declare class Search extends SvelteComponentTyped<
  SearchProps,
  SearchEvents,
  SearchSlots
> {}

export default Search;
