import type { SvelteComponentTyped } from "svelte/internal";

export interface ButtonProps {
  id?: string;
  ref?: null | HTMLButtonElement;
  label?: string;
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
  click?: WindowEventMap["click"];
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
