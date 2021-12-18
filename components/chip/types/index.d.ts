import type { SvelteComponentTyped } from "svelte/internal";

export interface ChipProps {
  id?: string;
  ref?: HTMLInputElement;
  title?: string;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  value: string;
  class?: string;
  style?: string;
}

export interface ChipEvents {}

export interface ChipSlots {
  default: {};
}

declare class Chip extends SvelteComponentTyped<
  ChipProps,
  ChipEvents,
  ChipSlots
> {}

export default Chip;
