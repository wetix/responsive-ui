import type { SvelteComponentTyped } from "svelte/internal";

export type SearchState = "loading";

export interface SearchProps {
  class?: string;
  ref?: null | HTMLInputElement;
  name?: string;
  value?: any;
  disabled?: boolean;
  placeholder?: string;
  size?: number;
  spellcheck?: boolean;
  debounceTimer?: number;
}

export interface SearchEvents {
  search?(e: CustomEvent<string>): void;
  clear?(e?: CustomEvent<unknown>): void;
  input?(e?: Event): void;
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
