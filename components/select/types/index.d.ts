import type { SvelteComponentTyped } from "svelte/internal";

export type SelectOption = {
  title: string;
  selected?: boolean;
  value: any;
};

export interface SelectProps {
  name?: string;
  readonly?: boolean;
  value?: string;
  options: SelectOption[];
}

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
