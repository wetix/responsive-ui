import type { SvelteComponent, SvelteComponentTyped } from "svelte/internal";

export type TableColumn = {
  title?: string;
  key?: string;
  class?: string;
  align?: "left" | "center" | "right";
  width?: number | string;
  component?: SvelteComponent;
};

export type TableItem = Record<string, any>;

export interface TableProps {
  items: TableItem[];
  columns: TableColumn[];
}

export interface TableEvents {}

declare class Table extends SvelteComponentTyped<TableProps, TableEvents> {}

export default Table;
