import type { SvelteComponentTyped } from "svelte/internal";

export interface InputNumberProps {
  id?: string;
  ref?: null | HTMLInputElement;
  class?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: number;
  min?: number;
  max?: number;
  readonly?: boolean;
  precision?: number;
  parser?: (v: string) => number;
  format?: (v: number) => string;
}

export interface InputNumberEvents {
  input?: WindowEventMap["input"];
  blur?: WindowEventMap["blur"];
  change?: WindowEventMap["change"];
}

declare class InputNumber extends SvelteComponentTyped<
  InputNumberProps,
  InputNumberEvents
> {}

export default InputNumber;
