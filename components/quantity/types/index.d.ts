import type { SvelteComponentTyped } from "svelte/internal";

export interface QuantityProps {
  id?: string;
  class?: string;
  ref?: HTMLInputElement;
  name?: string;
  form?: string;
  formaction?: string;
  readonly?: boolean;
  autofocus?: boolean;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  disabled?: boolean;
  style?: string;
}

export interface QuantityEvents {
  input?: WindowEventMap["input"];
  change?: WindowEventMap["change"];
}

export declare class QuantityComponent extends SvelteComponentTyped<
  QuantityProps,
  QuantityEvents
> {}

export default QuantityComponent;
