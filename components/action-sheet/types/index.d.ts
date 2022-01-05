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
}

export interface ActionSheetProps {
  class?: string;
  activeKey?: string;
  caption?: string;
  items: ActionSheetItem[];
  open?: boolean;
  disabled?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
}

export type ActionSheetTabChangeEvent = {
  activeKey: string;
  item: Omit<ActionSheetItem, "options">;
};

export type ActionSheetValueChangeEvent = {
  activeKey: string;
  option: ActionSheetActionSheetOption;
};

export type ActionSheetResetEvent = {};

export type ActionSheetOkEvent = {
  activeKey: string;
  values: string[];
};

export interface ActionSheetEvents {
  tabchange?: CustomEvent<ActionSheetTabChangeEvent>;
  valuechange?: CustomEvent<ActionSheetValueChangeEvent>;
  reset?: CustomEvent<ActionSheetResetEvent>;
  ok?: CustomEvent<ActionSheetOkEvent>;
}

export interface ActionSheetSlots {}

declare class ActionSheet extends SvelteComponentTyped<
  ActionSheetProps,
  ActionSheetEvents,
  ActionSheetSlots
> {}

export default ActionSheet;
