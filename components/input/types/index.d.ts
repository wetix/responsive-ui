import type { SvelteComponentTyped } from "svelte/internal";

export interface InputProps {
  ref?: null | HTMLInputElement;
  class?: string;
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  autocomplete?: "on" | "off";
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
  focus?: WindowEventMap["focus"];
  blur?: WindowEventMap["blur"];
  change?: WindowEventMap["change"];
  input?: WindowEventMap["input"];
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
