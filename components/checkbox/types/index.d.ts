import type { SvelteComponentTyped } from "svelte/internal";

export interface CheckboxProps {}

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
