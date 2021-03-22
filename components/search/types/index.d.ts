import type { SvelteComponentTyped } from "svelte/internal";

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
  input?: WindowEventMap["input"];
}

export interface SearchSlots {
  default: {
    loading: boolean;
  };
}

declare class Search extends SvelteComponentTyped<
  SearchProps,
  SearchEvents,
  SearchSlots
> {}

export default Search;
