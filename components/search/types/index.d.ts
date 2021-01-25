import type { SvelteComponentTyped } from "svelte/internal";

export type SearchState = "loading";

export interface SearchProps {
  ref?: null | HTMLInputElement;
  class?: string;
  name?: string;
  value?: any;
  disabled?: boolean;
  placeholder?: string;
  size?: number;
  spellcheck?: boolean;
  debounceTimer?: number;
}

export interface SearchEvents {
  search?: any;
  clear?: any;
  input?: any;
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
