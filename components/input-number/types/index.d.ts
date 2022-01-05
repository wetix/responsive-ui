import type { SvelteComponentTyped } from "svelte/internal";

export interface InputNumberProps {
  id?: string;
  ref?: HTMLInputElement;
  class?: string;
  name?: string;
  bordered?: boolean;
  textDirection?: "ltr" | "rtl";
  placeholder?: string;
  form?: string;
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
  focus?: WindowEventMap["focus"];
  blur?: WindowEventMap["blur"];
  change?: WindowEventMap["change"];
}

export interface InputNumberSlots {
  prefix: {};
  suffix: {};
}

declare class InputNumber extends SvelteComponentTyped<
  InputNumberProps,
  InputNumberEvents,
  InputNumberSlots
> {}

export default InputNumber;
