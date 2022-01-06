import type { SvelteComponentTyped } from "svelte/internal";

export interface SearchProps {
  ref?: HTMLInputElement;
  class?: string;
  name?: string;
  value?: any;
  disabled?: boolean;
  placeholder?: string;
  size?: number;
  loading?: boolean;
  spellcheck?: boolean;
  debounceTimer?: number;
}

export interface SearchEvents {
  input?: WindowEventMap["input"];
  search?: CustomEvent<{}>;
  clear?: CustomEvent<{}>;
}

export interface SearchSlots {
  default: {
    loading: boolean;
  };
}

export declare class SearchComponent extends SvelteComponentTyped<
  SearchProps,
  SearchEvents,
  SearchSlots
> {}

export default SearchComponent;
