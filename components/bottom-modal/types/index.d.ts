import type { SvelteComponentTyped } from "svelte/internal";

export interface BottomModalProps {
  open?: boolean;
  closable?: boolean;
  style?: string;
}

declare class BottomModal extends SvelteComponentTyped<BottomModalProps> {}

export default BottomModal;
