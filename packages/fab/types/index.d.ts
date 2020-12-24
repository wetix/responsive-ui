import type { SvelteComponentTyped } from "svelte/internal";

export interface FloatingActionButtonProps {}

export interface FloatingActionButtonEvents {}

export interface FloatingActionButtonSlots {
  default: {};
}

declare class FloatingActionButton extends SvelteComponentTyped<
  FloatingActionButtonProps,
  FloatingActionButtonEvents,
  FloatingActionButtonSlots
> {}

export default FloatingActionButton;
