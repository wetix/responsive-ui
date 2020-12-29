import type { SvelteComponentTyped } from "svelte/internal";

export interface FloatingActionButtonProps {
  class?: string;
  style?: string;
}

export interface FloatingActionButtonEvents {
  click?: void;
}

export interface FloatingActionButtonSlots {
  default: {};
}

declare class FloatingActionButton extends SvelteComponentTyped<
  FloatingActionButtonProps,
  FloatingActionButtonEvents,
  FloatingActionButtonSlots
> {}

export default FloatingActionButton;
