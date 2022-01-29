import { SvelteComponent } from "svelte";
import type { SvelteComponentTyped } from "svelte/internal";

export interface TabItem extends Record<string, any> {
  key: string;
  label: string;
  component?: typeof SvelteComponent;
}

export interface TabProps {
  id?: string;
  class?: string;
  items: TabItem[];
  selectedKey?: string;
  style?: string;
}

export interface TabEvents {}

export interface TabSlots {
  default: {
    item: TabItem;
    selectedKey: string;
  };
}

declare class Tab extends SvelteComponentTyped<TabProps, TabEvents, TabSlots> {}

export default Tab;
