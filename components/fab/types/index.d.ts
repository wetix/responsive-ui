import type { SvelteComponentTyped } from "svelte/internal";

export interface FloatingActionButtonProps {
  id?: string;
  label?: string;
  disabled?: boolean;
  class?: string;
  style?: string;
}

export interface FloatingActionButtonEvents {
  click?: WindowEventMap["click"];
}

export interface FloatingActionButtonSlots {}

declare class FloatingActionButton extends SvelteComponentTyped<
  FloatingActionButtonProps,
  FloatingActionButtonEvents,
  FloatingActionButtonSlots
> {}

export default FloatingActionButton;
