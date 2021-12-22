import type { SvelteComponentTyped } from "svelte/internal";

export interface BottomModalProps {
  open?: boolean;
  closable?: boolean;
  style?: string;
}

/**
 * Component slots.
 */
export interface BottomModalSlots {
  default: {};
}

declare class BottomModal extends SvelteComponentTyped<
  BottomModalProps,
  {},
  BottomModalSlots
> {}

export default BottomModal;
