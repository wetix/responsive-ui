import type { SvelteComponentTyped } from "svelte/internal";

export interface RowProps {
  id?: string;
  title?: string;
  class?: string;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "initial"
    | "inherit";
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

export interface RowSlots {
  default: Record<string, unknown>;
}

export declare class RowComponent extends SvelteComponentTyped<
  RowProps,
  Record<string, unknown>,
  RowSlots
> {}

export default RowComponent;
