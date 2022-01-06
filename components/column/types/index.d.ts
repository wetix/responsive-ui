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
  flex?: string;
  xs?: number;
  sm?: number;
  md?: number;
  xs?: number;
  lg?: number;
  class?: string;
  style?: string;
}

export interface ColumnEvents {}

export interface ColumnSlots {
  default: {};
}

export declare class ColumnComponent extends SvelteComponentTyped<
  ColumnProps,
  ColumnEvents,
  ColumnSlots
> {}

export default ColumnComponent;
