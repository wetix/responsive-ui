import type { SvelteComponentTyped } from "svelte/internal";

export interface ModalProps {
  class?: string;
  title?: string;
  open?: boolean;
  width?: number | string;
  outlined?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  style?: string;
}

export interface ModalEvents {
  cancel?: WindowEventMap["click"];
  ok?: WindowEventMap["click"];
}

export interface ModalSlots {
  header: {};
  default: {};
  footer: {};
}

declare class Modal extends SvelteComponentTyped<
  ModalProps,
  ModalEvents,
  ModalSlots
> {}

export default Modal;
