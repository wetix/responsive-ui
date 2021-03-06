import type { SvelteComponentTyped } from "svelte/internal";

export interface RowProps {
  class?: string;
  direction?:
    | "row"
    | "row-reverse"
    | "column"
    | "column-reverse"
    | "initial"
    | "inherit";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?:
    | "stretch"
    | "center"
    | "flex-start"
    | "flex-end"
    | "baseline"
    | "initial"
    | "inherit";
  style?: string;
}

export interface RowEvents {}

export interface RowSlots {
  default: {};
}

declare class Row extends SvelteComponentTyped<RowProps, RowEvents, RowSlots> {}

export default Row;
