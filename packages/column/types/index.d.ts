import type { SvelteComponentTyped } from "svelte/internal";

export interface ColumnProps {
  span?: number;
  justify?: string;
  class?: string;
  style?: string;
}

export interface ColumnEvents {}

export interface ColumnSlots {
  default: {};
}

declare class Column extends SvelteComponentTyped<
  ColumnProps,
  ColumnEvents,
  ColumnSlots
> {}

export default Column;
