import type { SvelteComponentTyped } from "svelte/internal";

export interface ColumnProps {}

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
