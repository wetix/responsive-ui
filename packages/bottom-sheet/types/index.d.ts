import type { SvelteComponentTyped } from "svelte/internal";

export interface BottomSheetProps {
  title?: string;
  open?: boolean;
}

export interface BottomSheetEvents {
  click?: void;
}

declare class BottomSheet extends SvelteComponentTyped<
  BottomSheetProps,
  BottomSheetEvents
> {}

export default BottomSheet;
