import type { SvelteComponentTyped } from "svelte/internal";

export interface InputNumberProps {
  ref?: null | HTMLInputElement;
  class?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: number;
  min?: number;
  max?: number;
  readonly?: boolean;
  parser?: (v: string) => number;
  format?: (v: number) => string;
}

export interface InputNumberEvents {
  change?: any;
}

declare class InputNumber extends SvelteComponentTyped<
  InputNumberProps,
  InputNumberEvents
> {}

export default InputNumber;
