import type { SvelteComponentTyped } from "svelte/internal";

export interface InputProps {
  ref?: null | HTMLInputElement;
  class?: string;
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  variant?: "small" | "medium" | "large";
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  size?: number;
  maxlength?: number;
  value?: any;
  required?: boolean;
  style?: string;
}

export interface InputEvents {
  change?: WindowEventMap["change"];
  input?: WindowEventMap["input"];
  blur?: WindowEventMap["blur"];
  enter?: any;
}

export interface InputSlots {
  prefix: {};
  suffix: {};
}

declare class Input extends SvelteComponentTyped<
  InputProps,
  InputEvents,
  InputSlots
> {}

export default Input;
