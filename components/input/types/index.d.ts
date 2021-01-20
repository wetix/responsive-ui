import type { SvelteComponentTyped } from "svelte/internal";

export interface InputProps {
  class?: string;
  name?: string;
  type?: "text" | "password" | "email" | "number" | "reset";
  placeholder?: string;
  disabled?: boolean;
  size?: number;
  maxlength?: number;
  autofocus?: boolean;
  value?: any;
  style?: string;
}

export interface InputEvents {
  change?: any;
  input?: any;
}

declare class Input extends SvelteComponentTyped<InputProps, InputEvents> {}

export default Input;
