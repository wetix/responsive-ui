import type { SvelteComponentDev, SvelteComponentTyped } from "svelte/internal";

type BottomSheetOption = {
  title: string;
  value: string;
  icon?: string | SvelteComponentDev | ReturnType<SvelteComponentDev>;
  disabled?: boolean;
  nowrap?: boolean;
  selected?: boolean;
};

export interface BottomSheetItem {
  title: string;
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
  change?: (
    e?: CustomEvent<{ selected: number; value: Map<string, boolean> }>
  ) => void;
  filter?: (e?: CustomEvent<{ value: Map<string, boolean> }>) => void;
  reset?: void;
}

declare class BottomSheet extends SvelteComponentTyped<
  BottomSheetProps,
  BottomSheetEvents
> {}

export default BottomSheet;
