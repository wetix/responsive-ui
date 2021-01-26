import type { SvelteComponentTyped } from "svelte/internal";

export interface QuantityProps {
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

export interface QuantityEvents {
  change?(e: CustomEvent<{ value: number; step: number }>): void;
}