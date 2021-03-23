import { SvelteComponent } from "svelte";
import type { SvelteComponentTyped } from "svelte/internal";

type BottomSheetOption = {
  label: string;
  value: string;
  icon?: string | typeof SvelteComponent | ReturnType<typeof SvelteComponent>;
  disabled?: boolean;
  nowrap?: boolean;
  selected?: boolean;
};

export interface BottomSheetItem {
  label: string;
  options: BottomSheetOption[];
  selected?: Map<string, boolean>;
  style?: string;
}

export interface BottomSheetProps {
  items: BottomSheetItem[];
  open?: boolean;
  selected?: number;
  disabled?: boolean;
  closable?: boolean;
}

export interface BottomSheetEvents {
  change?: any;
  filter?: any;
  reset?: any;
}

declare class BottomSheet extends SvelteComponentTyped<
  BottomSheetProps,
  BottomSheetEvents
> {}

export default BottomSheet;
