import type { SvelteComponentTyped } from "svelte/internal";

export interface ModalProps {
  class?: string;
  title?: null | string;
  width?: string;
  maskClosable?: boolean;
  open?: boolean;
  style?: string;
}

export interface ModalEvents {
  cancel?: WindowEventMap["click"];
  confirm?: WindowEventMap["click"];
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
