import type { SvelteComponentTyped } from "svelte/internal";

export interface InputProps {
  ref?: null | HTMLInputElement;
  class?: string;
  name?: string;
  type?: "text" | "password" | "email" | "number" | "reset";
  placeholder?: string;
  disabled?: boolean;
  size?: number;
  maxlength?: number;
  value?: any;
  style?: string;
}

export interface InputEvents {
  change?: any;
  input?: any;
  enter?: any;
}

declare class Input extends SvelteComponentTyped<InputProps, InputEvents> {}

export default Input;
