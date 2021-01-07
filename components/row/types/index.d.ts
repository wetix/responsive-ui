import type { SvelteComponentTyped } from "svelte/internal";

export interface RowProps {
  align?:
    | "stretch"
    | "center"
    | "flex-start"
    | "flex-end"
    | "baseline"
    | "initial"
    | "inherit";
}

export interface RowEvents {}

export interface RowSlots {
  default: {};
}

declare class Row extends SvelteComponentTyped<RowProps, RowEvents, RowSlots> {}

export default Row;
