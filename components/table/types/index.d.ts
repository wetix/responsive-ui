import { SvelteComponent } from "svelte";
import type { SvelteComponentTyped } from "svelte/internal";

export type TableItem = Record<string, unknown>;

export type TableColumn = {
  key: string;
  label: string;
  class: string;
  align: string | "left" | "center" | "right";
  width: number | string;
  nowrap: boolean;
  colspan: number;
  sorter: (a: TableItem, b: TableItem) => number;
  value: (key: unknown, args: TableItem) => unknown;
};

export type TableProps = {
  id?: string;
  ref?: HTMLDivElement;
  rowKey?: keyof TableItem;
  title?: string;
  tableLayout?: "fixed" | "auto" | "inherit" | "initial";
  columns: Partial<TableColumn>[];
  items: null | TableItem[];
  class?: string;
  striped?: boolean;
  showHeader?: boolean;
  loading?: boolean;
  bordered?: boolean;
  style?: string;
};

export interface TableEvents {}

export interface TableSlots {
  "table-head": {
    index: number;
  };
  "table-row": {
    index: number;
    item: TableItem;
  };
  "table-cell": {
    rowIndex: number;
    columnIndex: number;
    item: TableItem;
    column: TableColumn;
  };
  empty: {};
  loader: {};
}

export declare class TableComponent extends SvelteComponentTyped<
  TableProps,
  TableEvents,
  TableSlots
> {}

export default TableComponent;
