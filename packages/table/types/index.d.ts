import type { SvelteComponentTyped } from "svelte/internal";

export interface TableProps {
  items: any[];
  columns: any[];
}

export interface TableEvents {}

declare class Table extends SvelteComponentTyped<TableProps, TableEvents> {}

export default Table;
