import { SvelteComponent } from "svelte";
import type { SvelteComponentTyped } from "svelte/internal";

export type KeyValues = { key: string; values: string[] };

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
  selectedKey?: string;
  caption?: string;
  items: ActionSheetItem[];
  open?: boolean;
  disabled?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  draggable?: boolean;
}

export type ActionSheetTabChangeEvent = {
  selectedKey: string;
  item: Omit<ActionSheetItem, "options">;
};

export type ActionSheetValueChangeEvent = {
  selectedKey: string;
  option: ActionSheetOption;
};

export type ActionSheetResetEvent = {};

export type ActionSheetOkEvent = {
  selectedKey: string;
  keyValues: KeyValues[];
};

export interface ActionSheetEvents {
  tabchange?: CustomEvent<ActionSheetTabChangeEvent>;
  valuechange?: CustomEvent<ActionSheetValueChangeEvent>;
  reset?: CustomEvent<ActionSheetResetEvent>;
  ok?: CustomEvent<ActionSheetOkEvent>;
}

export interface ActionSheetSlots {
  item: {};
  option: {};
  footer: {};
}

export declare class ActionSheetComponent extends SvelteComponentTyped<
  ActionSheetProps,
  ActionSheetEvents,
  ActionSheetSlots
> {
  reset: () => void;
  getKeyValues: () => KeyValues;
}

export default ActionSheetComponent;
