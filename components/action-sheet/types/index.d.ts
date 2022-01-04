import { SvelteComponent } from "svelte";
import type { SvelteComponentTyped } from "svelte/internal";

export type ActionSheetOption = {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
};

export interface ActionSheetItem extends Record<string, any> {
  key: string;
  label: string;
  options: ActionSheetOption[];
  selected?: boolean;
}

export interface ActionSheetProps {
  class?: string;
  caption?: string;
  items: ActionSheetItem[];
  open?: boolean;
  maskClosable?: boolean;
  selected?: number;
  disabled?: boolean;
  closable?: boolean;
}

export interface ActionSheetEvents {
  ok?: CustomEvent<{ values: string[] }>;
  reset?: CustomEvent<{}>;
  valuechange?: CustomEvent<{ option: ActionSheetOption }>;
  tabchange?: CustomEvent<{
    key: string;
    item: Omit<ActionSheetItem, "options">;
  }>;
}

export interface ActionSheetSlots {}

declare class ActionSheet extends SvelteComponentTyped<
  ActionSheetProps,
  ActionSheetEvents,
  ActionSheetSlots
> {}

export default ActionSheet;
