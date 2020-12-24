import type { SvelteComponentTyped } from "svelte/internal";

export interface RowProps {}

export interface RowEvents {}

export interface RowSlots {
  default: {};
}

declare class Row extends SvelteComponentTyped<RowProps, RowEvents, RowSlots> {}

export default Row;
