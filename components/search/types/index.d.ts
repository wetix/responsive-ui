import type { SvelteComponentTyped } from "svelte/internal";

export interface SearchProps {
  name: string;
  value: any;
  placeholder?: string;
  size?: number;
  loading?: boolean;
  spellcheck?: boolean;
  debounceTimer?: number;
}

export interface SearchEvents {}

export interface SearchSlots {}

declare class Search extends SvelteComponentTyped<
  SearchProps,
  SearchEvents,
  SearchSlots
> {}

export default Search;
