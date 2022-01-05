import type { SvelteComponentTyped } from "svelte/internal";

export interface QuantityProps {
  id?: string;
  ref?: HTMLInputElement;
  name?: string;
  class?: string;
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

declare class Quantity extends SvelteComponentTyped<
  QuantityProps,
  QuantityEvents
> {}

export default Quantity;
