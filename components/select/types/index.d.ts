import type { SvelteComponentTyped } from "svelte/internal";

export interface SelectProps {}

export interface SelectEvents {}

export interface SelectSlots {
  default: {};
}

declare class Select extends SvelteComponentTyped<
  SelectProps,
  SelectEvents,
  SelectSlots
> {}

export default Select;
