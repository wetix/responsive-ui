import type { SvelteComponentTyped } from "svelte/internal";

export interface BottomSheetProps {
  id?: string;
  class?: string;
  open?: boolean;
  height?: number;
  draggable?: boolean;
  maskClosable?: boolean;
  style?: string;
}

/**
 * Component slots.
 */
export interface BottomSheetSlots {
  default: Record<string, unknown>;
}

export declare class BottomSheetComponent extends SvelteComponentTyped<
  BottomSheetProps,
  Record<string, unknown>,
  BottomSheetSlots
> {}

export default BottomSheetComponent;
