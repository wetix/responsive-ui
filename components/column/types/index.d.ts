import type { SvelteComponentTyped } from "svelte/internal";

export type Device = {
  sm?: number;
  md?: number;
  xs?: number;
  lg?: number;
};

export interface ColumnProps {
  id?: string;
  title?: string;
  span?: number | Device;
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
