import type { SvelteComponentTyped } from "svelte/internal";

export interface ModalProps {
  id?: string;
  class?: string;
  caption?: string;
  open?: boolean;
  width?: number | string;
  outlined?: boolean;
  closable?: boolean;
  hasHeader?: boolean;
  hasFooter?: boolean;
  hasMask?: boolean;
  maskClosable?: boolean;
  style?: string;
}

export interface ModalEvents {
  cancel?: CustomEvent<Record<string, unknown>>;
  ok?: CustomEvent<Record<string, unknown>>;
}

export interface ModalSlots {
  header: Record<string, unknown>;
  default: Record<string, unknown>;
  footer: Record<string, unknown>;
}

export declare class ModalComponent extends SvelteComponentTyped<
  ModalProps,
  ModalEvents,
  ModalSlots
> {}

export default ModalComponent;
