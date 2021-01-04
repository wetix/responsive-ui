import type { SvelteComponentTyped } from "svelte/internal";

type Option = {
  title: string;
  value: string;
  selected?: boolean;
};

export interface Item {
  title: string;
  options: Option[];
  style?: string;
}

export interface BottomSheetProps {
  title?: string;
  open?: boolean;
  items: Item[];
}

export interface BottomSheetEvents {
  click?: void;
}

declare class BottomSheet extends SvelteComponentTyped<
  BottomSheetProps,
  BottomSheetEvents
> {}

export default BottomSheet;
