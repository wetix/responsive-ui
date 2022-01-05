import type { SvelteComponentTyped } from "svelte/internal";

export interface BottomSheetProps {
  id?: string;
  class?: string;
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

export declare class BottomSheetComponent extends SvelteComponentTyped<
  BottomSheetProps,
  BottomSheetEvents,
  BottomSheetSlots
> {}

export default BottomSheetComponent;
