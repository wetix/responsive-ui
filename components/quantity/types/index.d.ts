import type { SvelteComponentTyped } from "svelte/internal";

export interface QuantityProps {
  id?: string;
  ref?: HTMLInputElement;
  name?: string;
  class?: string;
  min?: number;
  max?: number;
  autofocus?: boolean;
  value?: number;
  step?: number;
  disabled?: boolean;
  style?: string;
}

export interface QuantityEvents {
  input?: WindowEventMap["input"];
  change?: WindowEventMap["change"];
}

declare class Quantity extends SvelteComponentTyped<
  QuantityProps,
  QuantityEvents
> {}

export default Quantity;
