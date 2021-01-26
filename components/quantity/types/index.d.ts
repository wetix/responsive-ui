import type { SvelteComponentTyped } from "svelte/internal";

export interface QuantityProps {
  min?: number
  max?: number
  value?: number
  step?: number
  disabled?: boolean
}

export interface QuantityEvents {
  change?: any
}