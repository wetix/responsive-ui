import type { SvelteComponentDev } from "svelte/internal";

export type TableColumn = {
  key?: string;
  title: string;
  class?: string;
  align?: "left" | "center" | "right";
  width?: number | string;
  value?: ReturnType<any>;
  component?: any;
};

export type TableItem = Record<string, any> | object;

export interface TableProps {
  key: string;
  columns: TableColumn[];
  items: TableItem[];
  striped?: boolean;
  bordered?: boolean;
  class?: string;
  style?: string;
}

export interface TableEvents {}

export interface TableSlots {
  row: {
    index: number;
    item: TableItem;
  };
}

declare class Table extends SvelteComponentTyped<
  TableProps,
  TableEvents,
  TableSlots
> {}

export default Table;
