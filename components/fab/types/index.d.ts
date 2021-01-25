import type { SvelteComponentTyped } from "svelte/internal";

export interface FloatingActionButtonProps {
  class?: string;
  style?: string;
}

export interface FloatingActionButtonEvents {
  click?(e?: Event): void;
}

export interface FloatingActionButtonSlots {}

declare class FloatingActionButton extends SvelteComponentTyped<
  FloatingActionButtonProps,
  FloatingActionButtonEvents,
  FloatingActionButtonSlots
> {}

export default FloatingActionButton;
