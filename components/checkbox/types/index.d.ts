import type { SvelteComponentTyped } from "svelte/internal";

export interface CheckboxProps {
  id?: string;
  ref?: HTMLInputElement;
  label?: string;
  class?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  style?: string;
}

export interface CheckboxEvents {
  change?: WindowEventMap["change"];
}

export interface CheckboxSlots {
  default: {};
}

declare class Checkbox extends SvelteComponentTyped<
  CheckboxProps,
  CheckboxEvents,
  CheckboxSlots
> {}

export default Checkbox;
