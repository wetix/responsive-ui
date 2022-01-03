import { SvelteComponent } from "svelte";
import type { SvelteComponentTyped } from "svelte/internal";

type ActionSheetOption = {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
  // nowrap?: boolean;
};

export interface ActionSheetItem extends Record<string, any> {
  key: string;
  label: string;
  options: ActionSheetOption[];
  selected?: boolean;
}

export interface ActionSheetProps {
  items: ActionSheetItem[];
  open?: boolean;
  maskClosable?: boolean;
  selected?: number;
  disabled?: boolean;
  closable?: boolean;
}

export interface ActionSheetEvents {
  ok?: CustomEvent<{}>;
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
