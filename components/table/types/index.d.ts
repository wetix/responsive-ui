import type { SvelteComponentTyped } from "svelte/internal";

export type TableColumn = {
  key: string;
  label: string;
  class: string;
  align: string | "left" | "center" | "right";
  width: number | string;
  value: ReturnType<any>;
  component: any;
};

export type TableItem = Record<string, any> | object;

export type TableProps = {
  ref?: null | HTMLDivElement;
  key: string;
  columns: Partial<TableColumn>[];
  items: null | TableItem[];
  striped?: boolean;
  bordered?: boolean;
  class?: string;
  style?: string;
};

export interface TableEvents {}

export interface TableSlots {
  row: {
    index: number;
    item: TableItem;
  };
  empty: {};
}

declare class Table extends SvelteComponentTyped<
  TableProps,
  TableEvents,
  TableSlots
> {}

export default Table;
