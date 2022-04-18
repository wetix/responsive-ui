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
  flex?: null | number | string;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  sl?: number;
  class?: string;
  style?: string;
}

export interface ColumnSlots {
  default: Record<string, unknown>;
}

export declare class ColumnComponent extends SvelteComponentTyped<
  ColumnProps,
  Record<string, unknown>,
  ColumnSlots
> {}

export default ColumnComponent;
