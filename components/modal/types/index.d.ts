import type { SvelteComponentTyped } from "svelte/internal";

export interface ModalProps {
  id?: string;
  class?: string;
  caption?: string;
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
