import type { SvelteComponentTyped } from "svelte/internal";

export interface FloatingActionButtonProps {
  id?: string;
  title?: string;
  label?: string;
  class?: string;
  style?: string;
  transition?: boolean;
}

export interface FloatingActionButtonEvents {
  click?: WindowEventMap["click"];
}

export declare class FloatingActionButtonComponent extends SvelteComponentTyped<
  FloatingActionButtonProps,
  FloatingActionButtonEvents
> {}

export default FloatingActionButtonComponent;
