import type { SvelteComponent, SvelteComponentTyped } from "svelte/internal";

export interface TabItem {
  title: string;
  component?: SvelteComponent;
  style?: string;
}

export interface TabProps {
  items: TabItem[];
  selected?: number;
  style?: string;
}

export interface TabEvents {}

export interface TabSlots {
  default: {
    selected: number;
  };
}

declare class Tab extends SvelteComponentTyped<TabProps, TabEvents, TabSlots> {}

export default Tab;
