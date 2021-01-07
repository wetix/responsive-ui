import type { SvelteComponentTyped } from "svelte/internal";

export interface CheckboxProps {
  name: string;
  value?: any;
  disabled?: boolean;
  checked?: boolean;
}

export interface CheckboxEvents {}

export interface CheckboxSlots {
  default: {};
}

declare class Checkbox extends SvelteComponentTyped<
  CheckboxProps,
  CheckboxEvents,
  CheckboxSlots
> {}

export default Checkbox;
