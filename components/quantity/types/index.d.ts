import type { SvelteComponentTyped } from "svelte/internal";

export interface QuantityProps {
  id?: string;
  name?: string;
  class?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  disabled?: boolean;
  style?: string;
}

export interface QuantityEvents {
  change?: any;
}

declare class Quantity extends SvelteComponentTyped<
  QuantityProps,
  QuantityEvents
> {}

export default Quantity;
