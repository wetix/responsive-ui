import type { SvelteComponentTyped } from "svelte/internal";

export interface ButtonProps {
  title?: string;
  name?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  form?: string;
  style?: string;
}

export interface ButtonEvents {}

declare class Button extends SvelteComponentTyped<ButtonProps, ButtonEvents> {}

export default Button;
