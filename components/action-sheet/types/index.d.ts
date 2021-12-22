import { SvelteComponent } from "svelte";
import type { SvelteComponentTyped } from "svelte/internal";

type ActionSheetOption = {
  label: string;
  value: string;
  icon?: string | typeof SvelteComponent | ReturnType<typeof SvelteComponent>;
  disabled?: boolean;
  nowrap?: boolean;
  selected?: boolean;
};

export interface ActionSheetItem extends Record<string, any> {
  label: string;
  options: ActionSheetOption[];
  selected?: Map<string, boolean>;
  style?: string;
}

export interface ActionSheetProps {
  items: ActionSheetItem[];
  open?: boolean;
  selected?: number;
  disabled?: boolean;
  closable?: boolean;
}

export interface ActionSheetEvents {
  change?: any;
  filter?: any;
  reset?: any;
}

declare class ActionSheet extends SvelteComponentTyped<
  ActionSheetProps,
  ActionSheetEvents
> {}

export default ActionSheet;
