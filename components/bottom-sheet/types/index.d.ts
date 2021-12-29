import type { SvelteComponentTyped } from "svelte/internal";

export interface BottomSheetProps {
  open?: boolean;
  height?: number;
  draggable?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  style?: string;
}

export interface BottomSheetEvents {}

/**
 * Component slots.
 */
export interface BottomSheetSlots {
  default: {};
}

declare class BottomSheet extends SvelteComponentTyped<
  BottomSheetProps,
  BottomSheetEvents,
  BottomSheetSlots
> {}

export default BottomSheet;
