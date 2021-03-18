import type { SvelteComponent } from "svelte";
import type { SvelteComponentTyped } from "svelte/internal";

export interface TabItem {
  label: string;
  component?: typeof SvelteComponent;
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
