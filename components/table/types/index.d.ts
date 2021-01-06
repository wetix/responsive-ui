import type { SvelteComponent, SvelteComponentTyped } from "svelte/internal";

export type TableColumn = {
  title?: string;
  key?: string;
  class?: string;
  align?: "left" | "center" | "right";
  width?: number | string;
  value?: (...args: any[]) => any;
  component?: ((...args: any[]) => SvelteComponentDev) | SvelteComponentDev;
};

export type TableItem = Record<string, any>;

export interface TableProps {
  key: string;
  columns: TableColumn[];
  items: TableItem[];
}

export interface TableEvents {}

declare class Table extends SvelteComponentTyped<TableProps, TableEvents> {}

export default Table;
