import type { SvelteComponentTyped } from "svelte/internal";

export interface ButtonProps {
  title?: string;
  name?: string;
  type?: "button" | "submit" | "reset";
  class?: string;
  disabled?: boolean;
  outline?: boolean;
  form?: string;
  style?: string;
}

export interface ButtonEvents {
  click?: any;
}

export interface ButtonSlots {
  default: {};
}

declare class Button extends SvelteComponentTyped<
  ButtonProps,
  ButtonEvents,
  ButtonSlots
> {}

export default Button;
