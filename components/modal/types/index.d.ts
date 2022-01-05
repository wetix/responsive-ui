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
  cancel?: CustomEvent<{}>;
  ok?: CustomEvent<{}>;
}

export interface ModalSlots {
  header: {};
  default: {};
  footer: {};
}

export declare class ModalComponent extends SvelteComponentTyped<
  ModalProps,
  ModalEvents,
  ModalSlots
> {}

export default ModalComponent;
